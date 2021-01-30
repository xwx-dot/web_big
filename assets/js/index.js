$(function() {
    getUserInfo()
    var layer = layui.layer
    // 点击按钮实现退出功能，还是用layui提供的弹出层的询问框
    $("#btnLogout").on('click',function() {
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
            // 1.清空本地存储中的token
             localStorage.removeItem('token')
            // 2.重新跳转到登录页面
              location.href = '/xwx/lgn.html'
            // 模板自己给的关闭confirm询问框，不要做修改
            layer.close(index);
          });
        
    })


})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
       type: 'GET',
        url: '/my/userinfo',
        // 文档中写了以my开头的地址需要身份认证，前面登录的时候已经把获取到的认证信息放到本地存储了
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success:function(res){
            // 用户直接在地址栏输入后台地址，status等于1，message是身份认证失败
            // console.log(res);
           if (res.status !== 0) {
            //调用layui的弹出框
               return layui.layer.msg('获取用户信息失败')
           }
        // 获取用户信息成功则来渲染用户头像，调用renderAvatar函数
           renderAvatar(res.data)
        },
        // $.get，$.post,$.ajax成功会执行success函数，失败会执行
        // error函数，无论成功或者失败都会执行complete函数
    //     complete(res) {
    //         // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
    //         console.log(res);
    //         // 避免用户直接在地址栏输入后台页面的HTML地址，不登录直接进入后台
    //         // 即不登录不允许访问后台主页
    //  if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //             // 1.强制清空token
    //             localStorage.removeItem('token')
    //             // 2.强制跳转到登录页面
    //             location.href = '/xwx/lgn.html'
    //         }

    //     }
    })
}

//渲染用户的头像，需要把用户信息传过来 
function renderAvatar(user) {
//1.获取用户的名称
var name = user.nickname || user.username
// 2.设置欢迎文本
$("#welcome").html("欢迎&nbsp&nbsp" + name)
// 3.按需渲染用户的头像
if (user.user_pic !== null) {
    // 用户有图片地址，此时渲染图片头像
    $(".layui-nav-img").attr('src',user.user_pic).show()
    $(".text-avatar").hide()
} else {
     //没有图片地址，此时渲染文本头像,先隐藏图片头像
     $(".layui-nav-img").hide()
    //文本头像里面是名字的第一个字符，转化为大写
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
}

}
