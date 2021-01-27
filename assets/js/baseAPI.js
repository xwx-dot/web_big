// jquery在发起ajax，get,post请求时都会先调用ajaxPrefilter这个函数
// 在这个函数中可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 得到的是不包括根路径的接口地址
// console.log(options.url);
// 在调用ajax请求之前，为了页面代码的简洁性，统一拼接请求根路径
options.url = 'http://ajax.frontend.itheima.net' + options.url
console.log(options.url);
})