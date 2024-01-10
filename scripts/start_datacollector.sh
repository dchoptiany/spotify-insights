#!/bin/bash
PORT=${1:-8080}
VERSION=${2:-latest}

docker run -d -p ${PORT}:${PORT} --name datacollector \
  -e SPOTIFY_CLIENT_ID='90ec6685e54d40a2aeb635c633191c1d' \
  -e SPOTIFY_CLIENT_SECRET='176eaea4634e4676b4f431c8b58a836d' \
  spotify-insights-datacollector:${VERSION}
