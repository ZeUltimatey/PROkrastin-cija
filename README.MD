# PROkrastinācija
## Description
One of a kind
## Prerequisites
- Docker
- Ubuntu
## Getting Started
1) Run script locally in projets directory
```sh
git clone https://github.com/ZeUltimatey/PROkrastinacija.git
```
2) Run script locally in react-app directory
```sh
rm -rf node_modules package-lock.json
npm install
npm install react-scripts
``` 
3) In project directory run for local development
```sh
docker-compose -f docker-compose-local.yml up --build -d
```
Or for production build
```sh
docker compose up --build -d
```
4) Open http://localhost/
## Migrate the Database
After the Laravel app is running, migrate the database:
```sh
docker-compose exec app php artisan migrate
```

If you want to only work on react, frontend, enter this in project bash:

```sh
cd src/react-app
```
```sh
npm run start
```
