#!/bin/bash
PORT=${1:-6060}
VERSION=${2:-latest}

docker run -d -p ${PORT}:${PORT} -v /PWR/runtime/sketches:/spotify-insights/dataanalyser_api/sketches \
  --name dataanalyser_api \
  -e SKETCHES=/spotify-insights/dataanalyser_api/sketches/ spotify-insights-dataanalyser_api:${VERSION}
