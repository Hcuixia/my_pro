// 公共头部显示隐藏
function top_nav () {
	var top = $(this).scrollTop();

	var $li = $('.first-menu-wrap>li');
	var $logo = $('.logo2');
	var $wrap = $('.first-menu-wrap');
	var $top_bar =$('.top-bar');
	var $nav_bar =$('.nav-bar');
	var $search = $('.search-bar');

	if (top > 280) {
		$li.css({
			margin: '0 14px'
		},800);
		$logo.addClass('logo-show');
		$nav_bar.css({
			marginLeft: '-52px'
		});
		$wrap.css({
			textAlign: 'center'
		});
		$top_bar.css({
			marginTop: '-94px'
		});
		$search.css({
			top: '120px'
		});
	}else {
		$li.css({
			margin: '0 30px'
		},800);
		$logo.removeClass('logo-show');
		$nav_bar.css({
			marginLeft: '0'
		});
		$wrap.css({
			textAlign: 'center'
		});
		$top_bar.css({
			marginTop: '0'
		});
		$search.css({
			top: '36px'
		});
	}
};


//右侧固定侧边栏
function top_hide (obj,show_height) {
	var $obj  = $(obj);
	var top = $(document).scrollTop();

	if (top > show_height) {
		$obj.css("display","block")
	}else {
		$obj.css("display","none")
	}
};

//验证码
function canvasCode(id){
		var c3 = document.getElementById(id);
        var ctx = c3.getContext("2d");
        //1:创建矩形为验证创建背景(随机颜色)
        ctx.fillStyle = rc(180,230);
        ctx.fillRect(0,0,120,38);
        //2:创建4个字符绘制背景上
        var pool = "ABCDEFGHIJKLMNOPQRSTUVEXYZ1234567890";
        for(var i=0;i<4;i++){
          var c = pool[rn(0,pool.length)];
          ctx.textBaseline = "top";
          ctx.font = "24px SimHei";
          ctx.fillStyle = rc(80,180);
          ctx.fillText(c,i*18+5,6);
        }
        //3:创建5条干扰线
        for(var i=0;i<5;i++){
           ctx.beginPath();
           ctx.strokeStyle = rc(0,255)
           ctx.moveTo(rn(0,120),rn(0,30));
           ctx.lineTo(rn(0,120),rn(0,30));
           ctx.stroke();
        }
        //4:创建20个干扰点
        for(var i=0;i<20;i++){
          ctx.fillStyle = rc(0,255);
          ctx.beginPath();
          ctx.arc(rn(0,120),rn(0,30),1,0,2*Math.PI);
          ctx.fill();
        }
        //5:创建二个基本函数 
        //返回指定范围随机数
        function rn(min,max){
          var n = Math.random()*(max-min)+min;
          return Math.floor(n);
        } 
        //返回指定范围颜色
        function rc(min,max){
           var r = rn(min,max);
           var g = rn(min,max);
           var b = rn(min,max);
           return `rgb(${r},${g},${b})`;
        } 
	}
	
	$("#code").click(function () {
	canvasCode();
	})
/** 登录页面切换到注册页面 **/
function changeToRegister(){
    window.location.href = "http://127.0.0.1:3000/register.html";
}

/** 注册页面切换到登录页面 **/
function changeToLogin(){
    window.location.href ="http://127.0.0.1:3000/login.html";
}

/** 从扫码界面返回 **/
function goBack(){
    $(".code-back").addClass("hide");
    $(".code-wrap").addClass("hide");
    $(".form-wrap").removeClass("hide");
    $(".code-tips").removeClass("hide");
    $(".code-tip").removeClass("hide");
}




 
