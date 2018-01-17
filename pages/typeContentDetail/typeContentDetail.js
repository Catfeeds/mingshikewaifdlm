var app = getApp();
//引入这个插件，使html内容自动转换成wxml内容
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{

  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var title = "内容详情";
    var id = options.id;

    // wx.setNavigationBarTitle({ title: title });
    
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Web/getTypeContentDetail',
      method: 'post',
      data: { id:id },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var content = res.data.content.content;
        console.log(content);
        that.setData({
          title:res.data.content.title,
          author:res.data.content.author,
          content:res.data.content.content,
        })
        console.log('=========');
        WxParse.wxParse('content', 'html', content, that, 6);
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})