const { getGoodsList, addGoodsFav, getGoodsCate }=require('../../http/api.js');

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getApi() {

    getGoodsList().then(res=>{

      console.log('终于等到你',res)


    });

   //测试添加收藏功能
  // let goodsId ="395742"  //通常是通过传参接收的，我这里写死了
    //let token ="a9467405-35f3-4404-9212-2760845e6b5e"

   // addGoodsFav(goodsId,token)

    //getGoodsCate();

  },
  getUser(e) {
    console.log('获取用户信息：',e)
  },
  //用户注册
  register() {
    /**
     * 第一步：通过wx.login先获取code
     * 第二步：通过wx.getUserInfo获取encryptedData和iv
     * 第三步：调取后台注册接口写入用户信息
     */


    wx.login({
      success(res) {
        let {code}=res;
        
        if(code) {
          wx.getUserInfo({
            success(result) {
              console.log('test:', result)
              let { encryptedData, iv} =result;

               wx.request({
                 url: 'https://api.it120.cc/hjl/user/wxapp/register/complex',
                 data:{
                   code,
                   encryptedData,
                   iv
                 },
                 header:{
                   'content-type': ' application/x-www-form-urlencoded'
                 },
                method:'POST',
                success(res) {
                  console.log('注册返回的结果：',res)
                  if(res.data.code===0) {
                     wx.showToast({
                       title: '注册成功',
                     })
                  }

                  if(res.data.code===10000) {
                    wx.showToast({
                      title: '用户已注册',
                    })

                    //实现下面的跳转逻辑
                  }
                }

               })

            }
          })


        }
         

      },
      fail() {
        console.log('登录失败')
      }
    })

  }

})
