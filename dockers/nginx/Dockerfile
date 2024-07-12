# https://hub.docker.com/_/nginx
# FROM nginx:1.26-alpine-slim
# FROM debian:bullseye
# 
# WORKDIR /
# 
# COPY ./tools/dependencies.sh /usr/local/bin/dependencies.sh
# RUN chmod +x /usr/local/bin/dependencies.sh && \
# 	./usr/local/bin/dependencies.sh

# COPY ./tools/entrypoint.sh /usr/local/bin/
# RUN chmod +x /usr/local/bin/entrypoint.sh

# ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# COPY ./config/default /etc/nginx/sites-available/default
# COPY ./static/ /usr/share/nginx/html

# Starts thw nginx server as a foreground process.
# CMD ["nginx", "-g", "daemon off;"]

# # UNCOMMENT for debugging purposes.
# CMD ["tail", "-f", "/dev/urandom"]


FROM nginx:1.26-alpine-slim

RUN apk update && apk add openssl

# EXPOSE 80
EXPOSE 443

COPY ./config/ /etc/nginx/conf.d/
# COPY ./static/ ./usr/share/nginx/html

# SSL configuration
RUN mkdir -p /etc/nginx/ssl
RUN openssl req -x509 -newkey rsa:4096 -keyout /etc/nginx/ssl/key.key -out /etc/nginx/ssl/cert.crt -sha256 -days 3650 -nodes -subj "/C=CA/ST=Quebec/L=Quebec/O=42/OU=dude/CN=localhost"

CMD ["nginx", "-g", "daemon off;"]
