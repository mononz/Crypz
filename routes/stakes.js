const Router = require('koa-router');
const router = new Router({ prefix: '/stakes' });

router.post('/', async ctx => {
  ctx.request.body.forEach((item) => {
    item['price'] = 15
  });
  ctx.body = ctx.request.body;
});

module.exports = router;