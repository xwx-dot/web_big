// jquery在发起ajax，get,post请求时都会先调用ajaxPrefilter这个函数
// 在这个函数中可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 得到的是不包括根路径的接口地址
// console.log(options.url);
// 在调用ajax请求之前，为了页面代码的简洁性，统一拼接请求根路径
options.url = 'http://ajax.frontend.itheima.net' + options.url
// console.log(options.url);

// 统一为有权限的接口，设置headers请求头
 if (options.url.indexOf(/my/) !== -1) {
     options.headers = {
    Authorization: localStorage.getItem('token') || ''

     }
 }

// 全局统一挂载complete函数，避免在每个ajax请求都要调用一次这个函数
options.complete = function(res) {
       // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
       console.log(res);
       // 避免用户直接在地址栏输入后台页面的HTML地址，不登录直接进入后台
       // 即不登录不允许访问后台主页
if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
           // 1.强制清空token
           localStorage.removeItem('token')
           // 2.强制跳转到登录页面
           location.href = '/xwx/lgn.html'
       }
}
})