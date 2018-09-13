Crypz
=====

Firebase project using [Hosting](https://firebase.google.com/docs/hosting/) and [Functions](https://firebase.google.com/docs/functions/) for determining current cypto prices from either btcmarkets or coinbase

Functions are written for the Node 8 runtime.

## Setup

Create the .firebaserc project file
> cp .firebaserc.template .firebaserc

Update line 3 of the .firebaserc file with your project name
> "default": "firebase-project-name"

Install node modules
> cd functions && npm install

If not set, add the environment varables to the firebase project
> firebase functions:config:set database.port="VALUE" database.host="VALUE" database.user="VALUE" database.pass="VALUE" keys.coinbase.key="VALUE" keys.coinbase.secret="VALUE" keys.btcmarkets.key="VALUE" keys.btcmarkets.secret="VALUE"

## Local Testing

If not set, pull the environment config for local testing
> firebase functions:config:get>.runtimeconfig.json

Run and test locally
> firebase serve

## Deploy

Deploy hosting and functions with
> firebase deploy

or, only functions
> firebase deploy --only functions