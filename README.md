# About task-coffeemug-api

This was a recruitment task that I went overboard with (as usual :facepalm:). It uses ExpressJs, NodeJS, Typescript, mongodb and docker-compose to start everything up without any hassle.
Config is stored in `.env` file (one to rule them all) and propagated through the containers during build time.
As a code formatter of choice I use [xojs](https://github.com/xojs/xo) configured for my own needs. If you want to use it seamlessly install vscode extension [xo](https://marketplace.visualstudio.com/items?itemName=samverschueren.linter-xo).


The app consists of three containers:
- database - straightforward mongodb docker instance
- database seeding - it seeds db with sample data from `database/seed/data/products.json`
- backend - it installs all dependencies, builds app from Typescript and serves it on port specified in `.env` file

---

## How to run

- Pull this repository: `git pull https://github.com/Mannhattan/task-coffeemug-api.git`

- Copy `.env.template` contents to new `.env` file (and change variables if you need)

- Start production build with docker-compose (database, seeding and backend containers): `docker-compose up --build` (add `-d` flag for detached mode) :warning: if you want to preserve db data then uncomment `volumes` line from `docker-compose.yml` :warning:

- start dev environment (needs its own database and changes in `.env` file to accomodate that): `npm run dev`

---

## Available routes

- GET /api/v1/products
    gets all products

- GET /api/v1/products/:id
    gets details about specific product

- POST /api/v1/products/
    creates new product, saves it to database and returns it

- PUT /api/v1/products/:id
    updates existing product and returns it

- DELETE /api/v1/products/:id
    removes existing product from database

---

## Other things to note
- all containers are connected in a network and only backend container exposes its port to external use
- typescript lacks proper polish in some places
- logging could be added
- security could be added

---

## Bugs & bugfixes

Hopefully none at this point :wink: