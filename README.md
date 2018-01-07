Coin API
========

Basic NodeJS API developed with the Koa2 framework to check current trading margins between different cryptocurrency markets.

### Install & Run

> cp .env.template .env

> npm install

> node index

### Routes

GET /btcmarkets
> http://localhost:3000/btcmarkets?stake=300

Optional `stake` query param. Defaults to `2000` if not set