#!/bin/bash
PORT=${1:-6060}
VERSION=${2:-latest}

TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
aws_fqdn=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/public-hostname)

docker run -d -p ${PORT}:${PORT} -v /PWR/runtime/sketches:/spotify-insights/dataanalyser_api/sketches \
  --name dataanalyser_api \
  -e SKETCHES=/spotify-insights/dataanalyser_api/sketches/ \
  -e DATAANALYSER_API="http://${aws_fqdn}:8080/spotify-api/data-sketches/tracks" \
  spotify-insights-dataanalyser_api:${VERSION}
