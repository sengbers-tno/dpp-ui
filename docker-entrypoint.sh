#!/bin/sh
set -e

# Remove trailing slash if present from API_ENDPOINT
API_ENDPOINT=$(echo "${API_ENDPOINT}" | sed 's#/$##')
envsubst '${API_ENDPOINT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"