#!/bin/bash
set -e
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
aws_fqdn=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/public-hostname)
# update the code
find . -type f -name "*.js" -exec sed -i "s/aws_hostname/${aws_fqdn}/g" {} \;
