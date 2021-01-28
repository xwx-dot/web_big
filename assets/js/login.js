$(function() {
    // 点击注册账号链接
  $("#link_reg").on('click',function() {
      $(".login-box").hide()
      $(".reg-box").show()
  })
     //点击去登陆链接
  $("#link_login").on('click',function() {
    $(".login-box").show()
    $(".reg-box").hide()
})
// 自定义表单验证规则，对象里可以是数组也可以是函数
// 1.从layui中获取form对象，类似于引入jQuery有$对象，引入了layui就有layui对象
var form = layui.form
// 添加layui提供的提示框，在内置模块的弹出层
var layer = layui.layer
// 通过form.verify()函数自定义校验规则
form.verify({
  // 自定义密码框pwd的校验规则,在HTML页面中需要引入
  pwd:[/^[\S]{6,12}$/
  ,'密码必须6到12位，且不能出现空格'],
  // 校验两次密码是否一致的规则，value就是用户输入的值
  repwd:function(value) {
//通过形参value是确认密码框的内容
// 还需要拿到密码框中内容，两者进行比较
// 运用jQuery里面的属性选择器，拿到确认密码框里面输入的内容,也可以给密码框起个id
//属性选择器，选择类名为reg-box元素， 包裹的name属性为password的元素 
var pwd = $('.reg-box [name=password]').val()
if (pwd !== value) {
  return '两次密码不一致'
} 
  }
})

// 监听注册表单的提交事件
$("#form_reg").on('submit',function(e) {
  // 阻止表单的默认提交行为
  e.preventDefault()
  var data = {username: $('#form_reg [name=username]').val(),
  password: $('#form_reg [name=password]').val()}
  // 利用属性选择器选出对应的文本框
  $.post('/api/reguser',data,function(res) {
    if (res.status !== 0) {
      return layer.msg(res.message);
    }
    layer.msg('注册成功，请登录');
    // 模拟人的点击行为，注册结束以后直接跳转到登录页面，这个文件刚开始写了这个js代码
    $("#link_login").click()
  })
})

//监听登录表单的提交事件
$("#form_login").submit(function(e) {
  e.preventDefault()
  $.ajax({
    method: 'post',
    url:'/api/login',
    // 这里采用jQuery里提供的快速获得表单值的方法
    data: $(this).serialize(),
     success(res) {
       if (res.status !== 0) {
         return layer.msg('登录失败');
       }
       layer.msg('登录成功');
      //  console.log(res.token);
      // token值后续有权限的接口都需要用，所以存储到本地存储中
      localStorage.setItem('token',res.token)
      //  登陆成功以后要跳转到后台主页
      location.href = '/xwx/idx.html'
     }
  })
})
})  