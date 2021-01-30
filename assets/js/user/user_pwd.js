$(function () {
    // 1.为密码框自定义正则表达式(校验规则)
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //给新密码框单独自定义一个校验规则，它的值不能和原密码一样
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },

        //再自定义一个校验规则，再次确认新密码和密码框里内容相同
        // rePwd加在了请再次确认密码框上，所以value值就是这个密码框里面的值
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    // 给表达绑定submit事件，发起请求，修改密码
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改密码失败')
                }
                layui.layer.msg('修改密码成功')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})