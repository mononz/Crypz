Crypz
=====

Firebase project using [Hosting](https://firebase.google.com/docs/hosting/) and [Functions](https://firebase.google.com/docs/functions/) for determining current cypto prices from either btcmarkets or coinbase

Functions are written for the Node 8 runtime.

## Setup

Ensure you have at least Node 8.11 installed. Recommened using [nvm](https://github.com/creationix/nvm) to manage node versions
> npm install -g firebase-tools

If not logged in
> firebase login

Create the .firebaserc file by running
> firebase use --add
> Enter a name like 'default' as the alias after you select the project

Install node modules
> cd functions && npm install

If not set, add the environment varables to the firebase project
> firebase functions:config:set database.port="VALUE" database.host="VALUE" database.user="VALUE" database.pass="VALUE" keys.coinbase.key="VALUE" keys.coinbase.secret="VALUE" keys.btcmarkets.key="VALUE" keys.btcmarkets.secret="VALUE"

## Local Testing

If not set, pull the environment config for local testing
> firebase functions:config:get>.runtimeconfig.json

Run and test locally
> firebase serve

or run with optional host
> firebase serve --host 192.168.0.9


## Deploy

Deploy hosting and functions with
> firebase deploy

or, only functions
> firebase deploy --only functions

or, only single function
> firebase deploy --only functions:beta