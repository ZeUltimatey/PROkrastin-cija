# PROkrastinācija

## Description

One of a kind

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/ZeUltimatey/PROkrastinacija.git
cd PROkrastinacija
```
## Build and Run the Application
To build and run the application, use the following command:

```sh
docker-compose up --build -d
```

## Migrate the Database
After the Laravel app is running, migrate the database:

```sh
docker-compose exec app php artisan migrate
```
