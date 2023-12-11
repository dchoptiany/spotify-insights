BINARY_NAME=./_build/datacollector

build:
	GOARCH=amd64 GOOS=linux go build -o ${BINARY_NAME}-linux main.go

all: build

clean:
	go clean
	rm ${BINARY_NAME}-linux
