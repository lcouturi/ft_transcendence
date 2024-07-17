# https://hub.docker.com/_/nginx
FROM nginx:1.26-alpine-slim

RUN apk update && apk add openssl

EXPOSE 443

COPY ./nginx/config/ /etc/nginx/conf.d/

# If you need the html file in nginx, uncomment
# COPY ./static/ ./usr/share/nginx/html

# SSL configuration
RUN mkdir -p /etc/nginx/ssl
RUN openssl req -x509 -newkey rsa:4096 -keyout /etc/nginx/ssl/key.key -out /etc/nginx/ssl/cert.crt -sha256 -days 3650 -nodes -subj "/C=CA/ST=Quebec/L=Quebec/O=42/OU=dude/CN=localhost"

CMD ["nginx", "-g", "daemon off;"]

# # UNCOMMENT for debugging purposes.
# CMD ["tail", "-f", "/dev/urandom"]

