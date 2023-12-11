#!/bin/bash
PORT=${1:-8000}
VERSION=${2:-latest}

. ./secrets.env

docker run -d -p ${PORT}:${PORT} --name ui_passport_spotify -e PORT=${PORT} \
-e SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID} \
-e SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET} \
spotify-insights-ui_passport_spotify:${VERSION}
