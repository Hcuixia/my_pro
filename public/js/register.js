// 注册验证
$("#regPhone").blur(function () {
    var phone = $("#regPhone");
    var $phone = phone.parent().next().children();
	var reg = /^1[34578]\d{9}$/;
	if (!phone.val())
        $phone.html("手机号不能为空")
	else if (!reg.test(phone.val()))
        $phone.html("请输入正确的手机号")
	else {
		$.ajax({
			type: "get",
			url: "users/verification",
			async: true,
			data: {
				phone: phone.val()
			},
			success: function (data) {
				if (data.code == 301)
                    $phone.html("该号码已注册")
				if (data.code == 200)
                    $phone.html("")
			}
		});
	}
})

$("#regPwd").blur(function () {
    var upwd = $("#regPwd");
    var $upwd = upwd.parent().next().children();
	var reg = /^[a-z0-9_-]{6,16}$/;
	if (!upwd.val())
		$upwd.html("密码不能为空");
	else if (!reg.test(upwd.val()))
        $upwd.html("密码格式不正确");
	else
        $upwd.html("")
})

// 注册验证
$('#submitBtn').click(function(){
    var phone = $('#regPhone');
    var _phone = phone.parent().next().children();
    var upwd = $('#regPwd')
    var _upwd = upwd.parent().next().children();
    var reg = /^1[34578]\d{9}$/;
    if(!phone.val())
        _phone.html('手机号不能为空');
    else if(!upwd.val())
        _upwd.html("密码不能为空");
    else if (!/^[a-z0-9_-]{6,16}$/.test(upwd.val()))
        _upwd.html("密码格式不正确");
    else if (upwd.val() != $("#re_regPwd").val())
		$("#re_regPwd").parent().next().children().html("两次输入密码不一致");
    else if (!reg.test(phone.val()))
        _phone.html("手机号格式不正确");
    else{
        $.ajax({
            type:"get",
            url:"users/verification",
            async:true,
            data:{
                phone: phone.val()
            },
            success:function(data){
                if(data.code == 301){
                    alert("手机号已被注册");
                    $(location).prop('href','http://127.0.0.1:3000/register.html');
                    }
                if(data.code == 200){
                    $.ajax({
                        type:"post",
                        url:"/users/add",
                        async:true,
                        data:{
                            phone:phone.val(),
                            upwd:upwd.val()
                        },
                        success:function(res){
                            alert(res.msg)
                        }
                    })
                }else{
                    alert("注册失败");
                    $(location).prop('href','http://127.0.0.1:3000/register.html');
                }     
            }
        })
    }
})
//调用验证码
canvasCode("c4");