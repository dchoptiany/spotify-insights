#!/bin/bash

docker stop -t 1 $(docker ps -aq)
docker rm ui_passport_spotify
docker rm ui_frontend
docker rm datacollector
docker rm dataanalyser_api
