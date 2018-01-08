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

Optional query parameters

| Param    | Description             | Defaults |
| -------- | ----------------------- | -------: |
| stake    | amount to invest        | 2000     |
| sellFee  | btcmarkets trading fee  | 0.5      |
| minimal  | true for reduced output | false    |

Ex. http://localhost:3001/btcmarkets?stake=300&sellFee=0.75&minimal=false