const Coin       = require('../models/coin');
const Market     = require('../models/market');
const MarketCoin = require('../models/market_coin');
const Setting    = require('../models/setting');

exports.get = async function (req, res) {
  res.status(400).send('Nothing here: sync')
};

exports.param = async (req, res) => {
  res.status(400).send('Nothing here: ' + req.params.id)
};

exports.post = async (req, res) => {

  let tables = [];
  let promises = [];

  Object.keys(req.body).forEach(key => {
    let time = req.body[key];
    if (time === '0' || time === '1') {
      time = '2000-01-01T00:00:00.000Z';
    }

    let sync = null;
    switch (key) {
      case 'coin':
        sync = new Coin.sync(time);
        break;
      case 'market':
        sync = new Market.sync(time);
        break;
      case 'market_coin':
        sync = new MarketCoin.sync(time);
        break;
      case 'setting':
        sync = new Setting.sync(time);
        break;
    }
    if (sync !== null) {
      promises.push(sync);
      tables.push(key);
    }
  });

  let data = {};
  let responses = await Promise.all(promises);
  for (let i=0; i<responses.length; i++) {
    data[tables[i]] = responses[i].toJSON();
  }

  res.send({
    data: data
  });
};