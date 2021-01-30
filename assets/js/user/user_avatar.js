$(function() {
      // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比,表示裁剪区的宽高比，这里是正方形，想要长方形可以写16/9,数字自己定
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

// 为上传按钮绑定点击事件，点击了上传按钮，就相当于点击了选择文件按钮
 $("#btnChooseImg").on('click',function() {
     $("#file").click()
 })

//  为文件选择框绑定change事件,选择文件发生变化，就会调用这个函数
var layer = layui.layer
$('#file').on('change',function(e) {
    console.log(e);
    // 获取用户选择的文件列表
    var filelist = e.target.files
    if (filelist.length == 0) {
        return layer.msg('请选择照片')
    }
    // 如果选择了文件
    // 1.拿到用户选择的文件
    var file = e.target.files[0]
    // 2.利用URL.createObjectURL方法为图片生成一个新路径
    var newImgURL = URL.createObjectURL(file)
    // 3先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
})

// 为确定按钮绑定点击事件
$('#btnUpload').on('click',function() {
    //1. 拿到用户裁剪以后的头像
    // base64适合于小图片，提高网页打开速度，减少请求，缺点体积比源文件大30%
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2.调用接口，把头像上传到服务器
    $.ajax ({
        method: 'post',
        url: '/my/update/avatar',
        data: {
            avatar:dataURL
        },
        success(res) {
            if (res.status !== 0) {
                return layer.msg('更新头像失败')
            }
            layer.msg('更新头像成功')
            // 调用父页面的方法，把选择的图片渲染到头像上
            window.parent.getUserInfo()
        }
    })
    })

})