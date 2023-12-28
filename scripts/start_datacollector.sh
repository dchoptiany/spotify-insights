#!/bin/bash
PORT=${1:-8080}
VERSION=${2:-latest}

docker run -d -p ${PORT}:${PORT} --name datacollector spotify-insights-datacollector:${VERSION}
