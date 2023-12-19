#!/bin/sh

ipgw=$(ip ro sh  | grep default | awk '{print $3}')

echo -e "${ipgw}\tdocker-gateway" >> /etc/hosts

npm start
