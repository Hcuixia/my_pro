var vm;
$(function(){
    $.ajax({
        url:"header.html",
        type:"get",
        success:function(res){
            $(res).replaceAll(".comm-header");
            //搜索
vm = new Vue({
    el:"#top-bar",
    data:{
        islogin:false,
        keyword:""
    },
    methods:{
        search_click(){
            location.href=`http://127.0.0.1:3000/products.html?kw=${this.keyword}`
        }
    }
})
var $search = $("#btn-search");
var $input=$("#btn-search").prev();
     $input.keyup(function(e){
         if(e.keyCode ==13){
             $search.click()
         }
     })

     if(location.search.indexOf("kw=")!=-1){
         //?kw=macbook
         var kw=location.search.split("=")[1]
         $input.val(decodeURI(kw));
       }
//搜索结束


           //sessionStorage
           var phone = sessionStorage.getItem("phone");
           //console.log(phone);
           if (phone) {  

            var str =`<a href="javascript:;" id="logout">欢迎用户 : ${phone} ! &nbsp; 注销</a>`; 

           } else {
               str = `<a href="http://127.0.0.1:3000/login.html" title="">登录</a>`
               str += `<a href="http://127.0.0.1:3000/register.html" title="">注册</a>`;
           }
       
           $("#top_member_new").html(str);          
           $("#logout").click(function() {
               sessionStorage.removeItem("phone");
               window.location.reload();
           })
           
        }
    })
})


$(window).scroll(function () {
	// 公共头部显示隐藏
	top_nav ();
	// 右侧边栏
	top_hide($('.fixedtool'),600);
});






