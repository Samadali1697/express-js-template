.PHONY: up build down migration-create

up:
	@docker-compose up --remove-orphans

build:
	@docker-compose build

down:
	@docker-compose down --remove-orphans

migration-create:
	@npx ts-node -P ./tsconfig.json ./node_modules/typeorm/cli.js migration:create  ./src/migrations/$(name)
