#!/bin/bash

ipgw=$(ip ro sh  | grep default | awk '{print $3}')

echo -e "${ipgw}\tdocker-gateway" >> /etc/hosts

/spotify-insights/dataanalyser_api/dataanalyser_api
