

// 展示扫描二维码 
$(".show-code").click(function(){
	$(".code-wrap").removeClass("hide");
	$(".code-back").removeClass("hide");
	$(".form-wrap").addClass("hide");
	$(".code-tips").addClass("hide");
	$(".code-tip").addClass("hide");
});


//登录验证
$("#login").click(function(){
    var phone = $("#loginPhone");
    var upwd = $("#loginPwd");
    //console.log(phone.val())
    if(!phone.val()){
        phone.parent().next().children().html("手机号不能为空!");
    }
    else if(!upwd.val()){
        upwd.parent().next().children().html("密码不能为空!");
    }
    else if(upwd.val() && phone.val()){
        $.ajax({
            type:"post",
            url:"/users/login",
            async:true,
               data:{
                phone: phone.val(),
                upwd:upwd.val()
            },
            success: function(data) {
                console.log(data)   
                if(data.code == 401){
                    phone.val("手机号不能为空!");                  
                }   
                if(data.code == 402){
                    upwd.val("密码不能为空!");
                }    
                if(data.code == 200){
                    alert("登录成功");
                    //获取用户名保存 sessionStorage
                    sessionStorage.setItem("phone",phone.val());       
                    $(location).prop('href','http://127.0.0.1:3000/index.html');
                }else{
                    phone.val() = "手机号不能为空!";
                }
            }
        })
    }

    // session 存储
    



})
//调用验证码
canvasCode("c3");

