dev-seed:
		APP_ENV=development go run seeders/main.go

prod-seed:
		APP_ENV=production go run seeders/main.go

run-dev:
    APP_ENV=development go run main.go

run-prod:
    APP_ENV=production go run main.go
