#!/bin/bash
PORT=${1:-8000}
VERSION=${2:-latest}

export SPOTIFY_CLIENT_ID='90ec6685e54d40a2aeb635c633191c1d'
export SPOTIFY_CLIENT_SECRET='176eaea4634e4676b4f431c8b58a836d'

docker run -d -p ${PORT}:${PORT} -e PORT=${PORT} \
-e SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID} \
-e SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET} \
spotify-insights-ui_passport_spotify:${VERSION}
