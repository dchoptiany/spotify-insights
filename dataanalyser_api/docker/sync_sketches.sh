#!/bin/bash

set -e
set -o pipefail

curl -s -XGET -f "${DATAANALYSER_API}" | jq > /spotify-insights/dataanalyser_api/tmp/static.json
/spotify-insights/dataanalyser_api/bin/UpdateDataSketches /spotify-insights/dataanalyser_api/tmp/static.json
