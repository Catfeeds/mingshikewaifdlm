//index.js
//获取应用实例
const app = getApp();
var bmap = require('../budu-map/bmap-wx.min.js');
var wxMarkerData = [];

Page({
  data: {
    'address': '定位中',
    ak: "AXMRrsEZ0CGfogyRENeexOTkHxauhZtz",   //填写申请到的ak 
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    vertical:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    wx.showToast({
      title: '加载中...',
      icon:'loading',
    });
    var that = this
    //获取首页信息
    wx.request({
      url: app.d.ceshiUrl + '/Api/Index/index',
      header: {
          'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
          that.setData({
              imgUrls: res.data.ggtop,
              classify: res.data.procat,
              shop: res.data.shop,
              prolist:res.data.prolist,
              renqi: res.data.renqi,
              tubiao: res.data.tubiao,
              gonggao_list: res.data.gonggao_list,
              gonggaoimg:res.data.gonggaoimg,
          })
      }
    });



    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    /* 获取定位地理位置 */
    // 新建bmap对象   
    var BMap = new bmap.BMapWX({
      ak: that.data.ak,
    });
    console.log(BMap);
    var fail = function (data) {
      console.log('shibai_baiduMap');
      console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度  
      console.log('success_baiduMap');      
      console.log(data);
      //使用wxMarkerData获取数据  
      //  = data.wxMarkerData;  
      wxMarkerData = data.originalData.result.addressComponent.city
      //把所有数据放在初始化data内  
      console.log(wxMarkerData)
      that.setData({
        // markers: wxMarkerData,
        // latitude: wxMarkerData[0].latitude,  
        // longitude: wxMarkerData[0].longitude,  
        address: wxMarkerData
      });
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log('------------------------------');
        console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })


  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  synopsis: function(e){
    console.log(e);
    var name = e.currentTarget.dataset.name;
    if(name == 'about'){
      var type = 1;
      var name = 'about';
    }
    if(name == 'zhinan'){
      var type = 2;
      var name = 'zhinan';
    }
    if(name == 'gonggao'){
      var type = 3;
      var name = e.currentTarget.dataset.id;
    }
    console.log(type);
    console.log(name);
    wx.navigateTo({
      url: '../synopsis/synopsis?type=' + type +'&name=' + name
    })
  },

  prodectDetail:function(e){
    var productId = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../product/product?productId=' + productId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
      // var name = 1;
    })
    console.log(type);
    console.log(name);
    return false;
    wx.redirectTo({
      url: '../synopsis/synopsis'
    })
  },

  qinzihuodong:function(){
    wx.navigateTo({
      url: '../activityPage/activityPage?type='+1,
    })
  },

  xueshengzuoping:function(){
    wx.navigateTo({
      url: '../detailsPage/detailsPage',
    })
  },

  parentketang:function(){
    wx.navigateTo({
      url: '../activityPage/activityPage?type='+2,
    })
  },


  //   搜索
  suo: function () {
    wx.navigateTo({
      url: '../search/search',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  

  onShareAppMessage: function () {
    return {
      title: '广州教育培训中心',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }

})
