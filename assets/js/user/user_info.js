$(function() {
    // 1.从layui里面导出form,layer
    var form = layui.form
    var layer = layui.layer
    // 2.导入form.verify({})来创建自定义的校验规则
    form.verify({
        // 验证昵称框的输入规则，必须是1-6位的字符
        // 邮箱的验证规则layui里面提供了，就不需要自己写，直接在HTML页面lay-verify加上email就行
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须是1~6位的字符'
            }
        }
    })
    initUserInfo()
    // 初始化用户基本性信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                // 调用form.val()快速为表单赋值
                // 给lay-filter="formUserInfo"的表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置表单的数据,点击重置不清空表单，还原为之前的数据
    $('#btnReset').on('click',function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        // 调用初始化用户信息的函数
        initUserInfo()

    })

    // 监听表单的提交事件
    $('.layui-form').on('submit',function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status != 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 更新的信息在头像部分也需要做相应的更改，所以此时需要调用父页面
                // index.js中的方法getUserInfo，重新渲染用户的头像和信息
                // window就是当前的fm页面，它的父亲页面
                // 注意这个父页面里的函数必须是全局函数，这里才能调用，即这个函数不能写在父页面的入口
                // 函数里面，要写在入口函数外面
                window.parent.getUserInfo()
            }
        })
    })
})