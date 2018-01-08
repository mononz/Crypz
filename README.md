Coin API
========

Basic NodeJS API developed with the Koa2 framework to check current trading margins between different cryptocurrency markets.

### Install

Ensure the .env file exists
> cp .env.template .env

Install dependencies (rerun when package.json changes)

> npm install


### Run

> node index

or

> npm start


### Documentation

__GET /btcmarkets__

http://localhost:3000/btcmarkets?stake=300&sellFee=0.2

Optional `stake` and `sellFee` query params. Defaults to `2000` and `0.5` respectively when not set