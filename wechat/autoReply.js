var createXML = require("./createXML");
var path = require('path')
var Wechat = require('./wechat');

function autoReply(message, wechat) {
  console.log(wechat)
  var weixin = new Wechat(wechat);
  var now = new Date().getTime();
  if (message.MsgType === "event") {
    if (message.Event === "subscribe") {
      if (message.EventKey) {
        console.log("扫码进入");
      }
      return Promise.resolve(
        createXML({
          ToUserName: message.FromUserName,
          FromUserName: message.ToUserName,
          MsgType: "text",
          Content: '欢迎进入我的测试号!!\n 1、回复数字1你会得到一段文字\n 2、回复数字2你会得到一段音乐\n'+
          '3、回复数字3你会看到一段小视频\n 4、回复数字4你会看到一段小视频\n 5、你也可以回复数字5看看'
        })
      );
    } else if (message.Event === "unsubscribe") {
      console.log("取消关注");
      return Promise.resolve("");
    }
  } else if (message.MsgType === "text") {
    var content = message.Content;
    if (content === "1") {
      return Promise.resolve(
        createXML({
          ToUserName: message.FromUserName,
          FromUserName: message.ToUserName,
          CreateTime:now,
          MsgType: "text",
          Content:'哈哈，这是一条纯文本   !!!!!'
        })
      );
    }else if (content === "2") {
      return new Promise(function(resolve, reject) {
        weixin.uploadMaterial('image', path.join(__dirname, '../static/images/pic1.jpg'))
        .then(function(data) {
          console.log(0)
          resolve(
            createXML({
              ToUserName: message.FromUserName,
              FromUserName: message.ToUserName,
              CreateTime:now,
              MsgType: "image",
              MediaId:data.media_id
            })
          )
        })
        .catch(function(err) {
          reject(err);
        });
      })
    } else if (content === "3") {
      return new Promise(function(resolve, reject) {
        weixin.uploadMaterial('voice', path.join(__dirname, '../static/media/提醒铃声.mp3'))
        .then(function(data) {
          resolve(
            createXML({
              ToUserName: message.FromUserName,
              FromUserName: message.ToUserName,
              CreateTime:data.created_at,
              MsgType: "voice",
              MediaId:data.media_id
            })
          )
        })
        .catch(function(err) {
          reject(err);
        });
      })
    } else if (content === "4") {
      return new Promise(function(resolve, reject) {
        weixin.uploadMaterial('video', path.join(__dirname, '../static/media/flowers.mp4'))
        .then(function(data) {
          resolve(
            createXML({
              ToUserName: message.FromUserName,
              FromUserName: message.ToUserName,
              CreateTime:data.created_at,
              MsgType: "video",
              Title:"火热小视频",
              Description:"欣赏一段视频",
              MediaId:data.media_id
            })
          )
        })
        .catch(function(err) {
          reject(err);
        });
      })
    }else if (content === "5") {
      return Promise.resolve(
        createXML({
          ToUserName: message.FromUserName,
          FromUserName: message.ToUserName,
          CreateTime:now,
          MsgType: "news",
          Articles: [
            {
              Title: "热点关注",
              Description: "热点新闻，北方开始大风降温了，真是个傻子",
              PicUrl: "http://pic21.photophoto.cn/20111106/0020032891433708_b.jpg",
              Url: "http://www.baidu.com"
            },
            {
              Title: "雷达测试",
              Description: "测试图文消息描述",
              PicUrl: "http://pic9.photophoto.cn/20081128/0033033999061521_b.jpg",
              Url: "http://www.baidu.com"
            },
            {
              Title: "卫星卫星",
              Description: "测试消息描述",
              PicUrl: "http://pic5.photophoto.cn/20071228/0034034901778224_b.jpg",
              Url: "http://www.baidu.com"
            },
            {
              Title: "雷达测试",
              Description: "测试图文消息描述",
              PicUrl: "http://pic9.photophoto.cn/20081229/0034034829945374_b.jpg",
              Url: "http://www.baidu.com"
            }
          ]
        })
      );
    }else{
      return Promise.resolve(
        createXML({
          ToUserName: message.FromUserName,
          FromUserName: message.ToUserName,
          CreateTime:now,
          MsgType: "music",
          Title:"龙门阵",
          Description:"欣赏一段音乐",
          MusicURL:"http://122.225.243.20/mp3.9ku.com/m4a/464446.m4a",
          ThumbMediaId:'YgF_-Ef7K_-6vmvnNIWhzP9Qxh639CvsMptBnE8_KgAukHrEUifBpEvpPa-ZNxvI'
        })
      )
    }
  }
}
module.exports = autoReply;
