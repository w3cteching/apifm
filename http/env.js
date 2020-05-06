//设置公共访问的url,即环境地址


//commonJS规范--node.js采用的就是该规范 引入：require
module.exports={
  //开发环境url
  dev:{
    baseUrl:'http://localhost:3000'
  },
  //测试环境url
  test:{
    baseUrl:'http://www.test.com'
  },
  //线上环境url
  prod:{
    baseUrl:'https://api.it120.cc'
  }
}

//ES6 module  -- Vue中通常采用Es6的模块块化规范  引入：import
// export default {
//   //开发环境url
//   dev: {
//     baseUrl: 'http://localhost:3000'
//   },
//   //测试环境url
//   test: {
//     baseUrl: 'http://www.test.com'
//   },
//   //线上环境url
//   prod: {
//     baseUrl: 'https://api.it120.cc'
//   }
// }
