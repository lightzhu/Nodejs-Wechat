var sha1 = require('sha1');
var getRawBody = require('raw-body');
var util = require('./util');
var autoReply = require('./autoReply');
var Wechat = require('./wechat')

exports.get = function(opts) {
  var wechat = new Wechat(opts)
    return function *(next) {
        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);
        if (sha === signature) {
            this.body = echostr + '';
        }
    };
};
exports.post = function(opts) {
  var wechat = new Wechat(opts)
  return function *(next) {
      var token = opts.token;
      var signature = this.query.signature;
      var nonce = this.query.nonce;
      var timestamp = this.query.timestamp;
      var echostr = this.query.echostr;
      var str = [token, timestamp, nonce].sort().join('');
      var sha = sha1(str);
      if (sha !== signature) {
          this.body = 'wrong';
          return false;
      }

      var data = yield getRawBody(this.req, {
          length: this.length,
          limit: '1mb',
          encoding: this.charset
      });
      var message = yield util.parseXMLAsync(data);
      var xml = yield autoReply(message.xml, opts);
      // console.log(message);
      // console.log(xml);

      this.status = 200;
      this.type = 'application/xml';
      this.body = xml;
  };
};