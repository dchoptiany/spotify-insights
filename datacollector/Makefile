BINARY_NAME=./_build/datacollector

build:
	GOARCH=amd64 GOOS=linux go build -o ${BINARY_NAME}-linux main.go
	GOARCH=amd64 GOOS=windows go build -o ${BINARY_NAME}-windows main.go

all: build

clean:
	go clean
	rm ${BINARY_NAME}-linux
	rm ${BINARY_NAME}-windows
