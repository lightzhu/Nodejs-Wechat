var path = require('path')
var util = require('./util')
var wechat_file = path.join(__dirname, '../wechat.txt')
module.exports = {
  wechat: {
    appID: "wx0c971398d78c76f0",
    appSecret: "54c5f379be98a9edd4ec0229d18a1a8f",
    token: "zhuguoliangdeceshihao",
    getAccessToken: function() {
      //通过这个来实现获取access_token
      return util.readFileAsync(wechat_file);
    },
    saveAccessToken: function(data) {
      data = JSON.stringify(data);
      //通过这个来保存access_token
      return util.writeFileAsync(wechat_file, data);
    }
  }
};
