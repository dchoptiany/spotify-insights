#!/bin/bash
PORT=${1:-8080}
VERSION=${2:-latest}

docker run -d -p ${PORT}:${PORT} --name datacollector \
  -e SPOTIFY_CLIENT_ID='d81422beff084f90a56a188b173fd47f' \
  -e SPOTIFY_CLIENT_SECRET='d810c89a0da640439721ef6c572ea183' \
  spotify-insights-datacollector:${VERSION}
