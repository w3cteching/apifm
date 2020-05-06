//引入env中的url
const { baseUrl } = require('./env.js').prod

//专用域名
const subDomain='hjl';



module.exports={
  /**
   * 二次封装wx.request
   * {String }url:请求的接口地址
   * {String} method:请求方式 GET,POST....
   * {Object} data:要传递的参数
   * { boolean }isSubDomain:表示是否添加二级子域名 true代表添加,false代表不添加
   */
  request: (url, method='GET', data={}, isSubDomain)=>{

    let _url = `${baseUrl}/${isSubDomain ? subDomain:'' }${url}`;

     return new Promise((resolve,reject)=>{


       wx.showLoading({
         title: '正在加载',
       })

       wx.request({
         url: _url,
         data: data,
         method: method,
         header: {
           'content-type': 'application/x-www-form-urlencoded',

         },
         success(res) {
           // console.log('获取数据：', res)
           /**
            * code:0,msg,data
            */

            let {code}=res.data;

           if(code===0) {
              resolve(res.data);
              wx.hideLoading()
              
           }else {

              wx.showToast({
                title: '数据请求误',
              })


           }


         },
         fail(){
           reject('接口请求有误，有检查');
         }


       });


     });

    

   },

}