const Router = require('koa-router');
const router = new Router({ prefix: '/' });

router.get('robots.txt', ctx => {
  ctx.type = 'text/plain; charset=utf-8';
  ctx.body = "User-agent: *\nDisallow: /";
});

router.get('/', async ctx => {
  ctx.body = 'hi';
});

module.exports = router;