.PHONY: up build down

up:
	@docker-compose up --remove-orphans

build:
	@docker-compose build

down:
	@docker-compose down --remove-orphans
