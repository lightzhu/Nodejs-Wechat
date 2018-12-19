var router = require('koa-router')();
var index_middleware = require('../wechat/index_middleware');
var config = require('../wechat/config');

router.get('/', index_middleware.get(config.wechat));
router.post('/', index_middleware.post(config.wechat));
// router.get('/', function *(next) {
//   yield this.render('index', {
//     title: 'Hello World Koa!'
//   });
// });

// router.get('/foo', function *(next) {
//   yield this.render('index', {
//     title: 'Hello World foo!'
//   });
// });

module.exports = router;
