BINARY_NAME=./_build/data_analyser

build:
	g++ DataAnalyser.cpp FastExpSketch.cpp -O3 -Wall -pedantic -o ${BINARY_NAME}-linux

all: build

clean:
	rm ${BINARY_NAME}-linux
