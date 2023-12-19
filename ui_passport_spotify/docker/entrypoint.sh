#!/bin/sh

ipgw=$(ip ro sh  | grep default | awk '{print $3}')

echo -e "${ipgw}\tdocker-gateway" >> /etc/hosts

cat << EOF > ./config.env
PORT=${PORT}
SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID}
SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET}
EOF

npm start
