# https://hub.docker.com/_/python
# https://github.com/docker-library/python/blob/b968d488efc09fd34672fc6238182e1222ae005e/3.12/bullseye/Dockerfile
FROM python:3.12-slim-bullseye

WORKDIR /django

# Container's dependencie(s) installations.
COPY ./tools/dependencies.sh /usr/local/bin
RUN chmod +x /usr/local/bin/dependencies.sh && \
    /usr/local/bin/dependencies.sh

# Required package(s) installation.
COPY ./tools/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# # Specify the application source code to copy into the container.
# COPY . .

EXPOSE 8000

# UNCOMMENT to use the provided ./ft_transcendence application.
# If !COMMENTED, make sure to COMMENT the VOLUME attributes in the docker-compose.yaml file.
COPY ./ft_transcendence .
# COPY ./static /static

# Setting up ENTRYPOINT script.
COPY ./tools/entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/entrypoint.sh

# Copy the wait-for-it script and make it executable
COPY ./tools/wait-for-it.sh /usr/local/bin
RUN chmod +x /usr/local/bin/wait-for-it.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Runs the DAPHNE Asynchronous Server Gateway Interface (ASGI).
# https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/daphne/
CMD ["daphne", "ft_transcendence.asgi:application"]

# # UNCOMMENT for debugging purposes.
# CMD ["tail", "-f", "/dev/urandom"]
