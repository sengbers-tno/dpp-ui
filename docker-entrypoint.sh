#!/bin/sh
set -e

envsubst '${API_ENDPOINT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"