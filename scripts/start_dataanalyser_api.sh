#!/bin/bash
PORT=${1:-6060}
VERSION=${2:-latest}

docker run -d -p ${PORT}:${PORT} spotify-insights-dataanalyser_api:${VERSION}
