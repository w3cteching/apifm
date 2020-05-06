//引入封装的reuest请求
const { request }=require('./request.js')



//基于业务封装的数据请求

module.exports={

  /**
   * 封装商品列表方法
   */
  getGoodsList: ()=>{
    return request('/shop/goods/list','POST',{},true);
  },

  /**
   * 添加商品收藏
   */
  addGoodsFav:(goodsId,token)=>{

    return request('/shop/goods/fav/add', 'POST', { goodsId, token },true);

  },
  /**
   * 获取商品分类
   */
  getGoodsCate:()=>{

    return request('/shop/goods/category/all','GET',{},true);

  },
  //继续封装其他接口....


}