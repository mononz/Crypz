const Koa         = require('koa');
const views       = require('koa-views');
const serve       = require('koa-static');
const qs          = require('koa-qs');
const logger      = require('koa-logger');
const bodyParser  = require('koa-bodyparser');
const favicon     = require('koa-favicon');

const app = new Koa();

qs(app);
app.use(bodyParser());
app.use(logger());
app.use(views(`${__dirname}/views`, { extension: 'hbs', map: { hbs: 'handlebars' } }));
app.use(favicon(`${__dirname}/public/favicon.ico`));
app.use(serve(`${__dirname}/public`));

const PORT = process.env.PORT || '3000';

const index  = require('./routes/index');
app.use(index.routes());

app.listen(PORT, () => console.log('API running on ' + PORT));

module.exports = app;