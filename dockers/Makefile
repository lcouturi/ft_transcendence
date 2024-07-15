
all: up

up:
	@	docker compose -f docker-compose.yaml up --build -d

down:
	@	docker compose -f docker-compose.yaml down

rm_ps:
#	Removes any running or stopped processe(s) based on DJANGO image.
	@	if docker ps -a --format {{.Image}} | grep -q 'django'; then \
			docker rm -f $$(docker ps -a --format '{{.ID}} {{.Image}}' \
			| grep 'django' | awk '{print $$1}'); \
		fi

rm_images: rm_ps
#	Removes DJANGO image(s).
	@	if docker image ls --format {{.Repository}} | grep -q 'django'; then \
			docker image rm $$(docker image ls --format '{{.ID}} {{.Repository}}' \
			| grep 'django' | awk '{print $$1}');\
		fi

rm_volume:
	@	ARG=$$(docker volume ls --format {{.Name}}); if echo $$ARG | grep -q 'volume-django'; then \
			docker volume rm $$ARG; \
		fi

clean: rm_images

nuke: clean rm_volume
	@	docker compose -f docker-compose.yaml down
	@	docker system prune --all --force --volumes
