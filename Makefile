# Variables
COMPOSE_FILE := ./docker-compose.yml
DOCKER_COMPOSE := docker-compose -f $(COMPOSE_FILE)

# Default target
.DEFAULT_GOAL := up

.PHONY: help build up down restart logs ps stats clean rebuild

help:  ## Show this help message
	@awk 'BEGIN {FS = ":.*##"; printf "Targets:              Description:\n"} \
        /^[a-zA-Z_-]+:.*##/ { printf "%-20s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

build:  ## Build the Docker image
	$(DOCKER_COMPOSE) build

up:  ## Build and start the containers in detached mode
	$(DOCKER_COMPOSE) up -d --build

down:  ## Stop and remove the containers
	$(DOCKER_COMPOSE) down

restart:  ## Restart the Docker containers
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up -d

logs:  ## Show logs of the Docker containers
	$(DOCKER_COMPOSE) logs -f

logs-django:  ## Show logs of the Django container
	$(DOCKER_COMPOSE) logs -f django

logs-nginx:  ## Show logs of the Nginx container
	$(DOCKER_COMPOSE) logs -f nginx

logs-db:  ## Show logs of the PostgreSQL container
	$(DOCKER_COMPOSE) logs -f db

ps:  ## List containers
	$(DOCKER_COMPOSE) ps

stats: ## Show Docker system statistics
	@echo "Containers:"
	@docker ps -a
	@echo "\nNetworks:"
	@docker network ls
	@echo "\nImages:"
	@docker images
	@echo "\nVolumes:"
	@docker volume ls

clean: ## Remove all stopped containers, networks, and volumes
	$(DOCKER_COMPOSE) down -v
	docker system prune -f --volumes
	docker network prune -f
	docker volume prune -f
	docker image prune -a -f
	docker container prune -f

rebuild:  ## Rebuild the Docker image without cache
	$(DOCKER_COMPOSE) build --no-cache
	$(DOCKER_COMPOSE) up -d --build --force-recreate --no-deps --remove-orphans
