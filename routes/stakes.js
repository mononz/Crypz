const Router = require('koa-router');
const router = new Router({ prefix: '/stakes' });

const timeout = ms => new Promise(res => setTimeout(res, ms));

router.post('/', async ctx => {
  //await timeout(2000);
  ctx.request.body.forEach((item) => {
    item['price'] = 1000
  });
  ctx.body = ctx.request.body;
});

module.exports = router;