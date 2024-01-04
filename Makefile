SHELL:=/bin/bash

goModules=on

VERSION:=$(shell cat VERSION)

datacollector_dir=datacollector
datacollector_build=$(datacollector_dir)/_build
datacollector_bin=datacollector

dataanalyser_dir=dataanalyser
dataanalyser_build=$(dataanalyser_dir)/_build
dataanalyser_bin=dataanalyser

dataanalyser_api_dir=dataanalyser_api
dataanalyser_api_build=$(dataanalyser_api_dir)/_build
dataanalyser_api_bin=dataanalyser_api

ui_frontend_dir=ui_frontend
ui_passport_spotify_dir=ui_passport_spotify

build_datacollector:
	GOARCH=amd64 GOOS=linux go build -o $(datacollector_build)/$(datacollector_bin)-$(VERSION) $(datacollector_dir)/main.go

build_datacollector_docker: build_datacollector
	docker build --build-arg VERSION=$(VERSION) -t spotify-insights-datacollector:$(VERSION) -f $(datacollector_dir)/docker/Dockerfile $(datacollector_dir)
	docker tag spotify-insights-datacollector:$(VERSION) spotify-insights-datacollector:latest

build_dataanalyser:
	cd dataanalyser && make all

clean_dataanalyser:
	cd dataanalyser && make clean

build_dataanalyser_docker: build_dataanalyser
	docker build --build-arg VERSION=$(VERSION) -t spotify-insights-dataanalyser:$(VERSION) -f $(dataanalyser_dir)/docker/Dockerfile $(dataanalyser_dir)
	docker tag spotify-insights-dataanalyser:$(VERSION) spotify-insights-dataanalyser:latest

build_dataanalyser_api:
	GOARCH=amd64 GOOS=linux go build -o $(dataanalyser_api_build)/$(dataanalyser_api_bin)-$(VERSION) $(dataanalyser_api_dir)/main.go

build_dataanalyser_api_docker: build_dataanalyser_api build_dataanalyser_docker
	docker build --build-arg VERSION=$(VERSION) -t spotify-insights-dataanalyser_api:$(VERSION) -f $(dataanalyser_api_dir)/docker/Dockerfile $(dataanalyser_api_dir)
	docker tag spotify-insights-dataanalyser_api:$(VERSION) spotify-insights-dataanalyser_api:latest

build_ui_frontend_docker:
	docker build --build-arg VERSION=$(VERSION) -t spotify-insights-ui_frontend:$(VERSION) -f $(ui_frontend_dir)/docker/Dockerfile $(ui_frontend_dir)
	docker tag spotify-insights-ui_frontend:$(VERSION) spotify-insights-ui_frontend:latest

build_ui_passport_spotify_docker:
	docker build --build-arg VERSION=$(VERSION) \
	-t spotify-insights-ui_passport_spotify:$(VERSION) -f $(ui_passport_spotify_dir)/docker/Dockerfile $(ui_passport_spotify_dir)
	docker tag spotify-insights-ui_passport_spotify:$(VERSION) spotify-insights-ui_passport_spotify:latest

all_bin: build_datacollector build_dataanalyser build_dataanalyser_api
all_docker: build_datacollector_docker build_dataanalyser_docker build_dataanalyser_api_docker build_ui_frontend_docker build_ui_passport_spotify_docker
all: all_bin all_docker
