
$(function(){
  if(location.search.indexOf("lid=")!=-1){
    var lid=location.search.split("=")[1];
  $.ajax({
    url:"http://127.0.0.1:3000/details",
    type:"GET",
    data:`lid=${lid}`,
    dataType:"json",
    success: function(obj) {
      //console.log(obj);
      var {product,dnames,pics}=obj;
      //console.log(obj.product)
      var {title,subtitle,price,old_price,active,promise,spec,stock,sales}=product;
      var html="";
          html +=`<h2 class="goods-title">${title}</h2>`;
          html +=`<p class="detail">${subtitle}</p>`;
          html +=`<div class="choose-attrs clearfix tag">
                <div class="dt">优惠信息：</div>
                <div class="dd" id="actDivs"><div><span class="tag-name">${active}</span></div><div><span class="tag-name">${promise}</span></div></div>
                </div>`;
          html +=`<p class="hr"></p>
          <div class="choose-attrs clearfix">
            <div class="dt">价　　格：</div>
            <div class="dd clearfix">
              <div class="price original-price" id="orgPrice">
                <span>¥${old_price}</span>
              </div>
              
            </div>
          </div>
          <div class="choose-attrs clearfix" id="actDiv">
            <div class="dt">活动价格：</div>
            <div class="dd clearfix">
              <div class="price">
                <span class="discount-price">¥${price}</span>
              </div>
              <div class="integral" id="actIntegral"><span class="title">赠送积分：</span><span id="integralSp">237</span></div>
            </div>
          </div>`;
            html+=`<div class="choose-attrs clearfix">
            <div class="dt">选择颜色：</div><div class="dd">`
          for(var d of dnames){
            html +=`                
                <a href="details.html?lid=${d.lid}"
                class ="${d.lid==lid?'selected':' '}">${d.dname}
                <i class="ie6" ></i></a>`
          }
            html +=`</div></div><div class="choose-attrs clearfix">
            <div class="dt">选择尺码：</div>
            <div class="dd">`
            html +=`<a class="selected" href="#">${spec}<i class="ie6"></i></a>` 
            html +=`</div></div>`;
            html +=`<div class="choose-attrs clearfix">
            <div class="dt">购买数量：</div>
            <div class="dd clearfix">
              <div class="num">	
                <button class="btn-operation reduce">-</button>
                <input type="text" id="goodsNo" value="1" class="num-input" maxlength="3">
                <button class="btn-operation plus">+</button>
              </div>
              <div class="num-info">
                <span id="stockId">库存${stock}件</span>
                <span id="salesNum">已售${sales}件</span>
              </div>
            </div>
          </div>`
          html +=`<p class="hr"></p>
          <div class="choose-attrs to-buy">
              <button type="button" id="jCard" class="btn btn-default btn-green jiacar">加入购物车</button>
              <button type="button" id="bNow" class="btn btn-default buynow">立即购买</button>
              <span class="attention">加关注</span>
              <span class="contact" >联系客服</span>
          </div>`
            var div = $("#details>.right>.goods-msg");
            div.html(html);
              var html = "";
              for(var p of pics){
                var {sm,md,lg} = p;
                html += `<li>
                <img 
                data-md="${md}" 
                data-lg="${lg}"
                src="${sm}">
              </li>`
              }
              var ul = $("#select_show");
              ul.html(html);
              $("#right>.big-img>img").attr("src",pics[0].md);
              $("#right>#lgDiv>img").attr("src",pics[0].lg);
                /*小图片切换*/    
            $("#select_show").children(":first-child").children().addClass("cur");
            $("#select_show").on("mouseover","img",function(){  
              var $pic=$(this);
              if($pic.hasClass("")){
                var $imgs=$("#select_show>li>img")
                $imgs.prop("class","");
                $pic.addClass("cur");
                var md=$pic.attr("data-md");
                var lg=$pic.attr("data-lg");
                $("#right>.big-img>img").attr("src",md);
                $("#right>#lgDiv>img").attr("src",lg);
                
              }
          
            })  
                  /*放大镜效果*/
          var $lgDiv=$("#lgDiv");
          var $lgDivImg=$("#lgDiv>img");
          var Mwidth=200,Mheight=200,Swidth=500,Sheight=500,MAX_x=Swidth-Mwidth,MAX_y=Sheight-Mheight;
            var $mask=$("#mask"),$smask=$("#super-mask");
            $smask.hover(function(){
              //console.log(11111);
              $mask.toggleClass("d-none");
              $lgDiv.toggleClass("d-none");
            }).on("mousemove",function(e){   
              var top=e.offsetY-Mheight/2;
              var left=e.offsetX-Mwidth/2;
              
              
            if(top<0){ top=0;}
            else if(top>MAX_y){top=MAX_y;}
          
            if(left<0) {left=0;}
            else if(left>MAX_x) {left=MAX_x;}
            
              $mask.css({top,left});
              $lgDivImg.css("left",`${-800/500*left}px`);
              $lgDivImg.css("top",` ${-800/500*top}px`);
              
            })
      // 颜色选择  尺码选择
      $(".choose-attrs>.dd").on("click","a",function(e){	
        var $sel=$(e.target);
        /*颜色选择*/	
          if($sel.parent().hasClass("dd")&& !$sel.parent().hasClass("selected")){
            $sel.parent().siblings().removeClass("selected");
            $sel.parent().addClass("selected");
          }
          if(!$sel.hasClass("selected")){
            $sel.siblings().removeClass("selected");
            $sel.addClass("selected");
          }
      })
          /*尺码选择*/
          $(".choose-attrs>.dd").on("click","a",function(e){
            var $sel=$(e.target);
            if($sel.parent().hasClass("dd") && !$sel.hasClass("selected")){			
              $sel.siblings().removeClass("selected");
              $sel.addClass("selected")
            }
          })

          //加入购物车
            var index = 1;
            var i = 1;
            //加数量
            $(".num>.plus").click(function(){
              index++;
              $("#goodsNo").val(index);	
            })
            //减数量
            $(".num>.reduce").click(function(){
              index--;
              if(index < 1){
                return index = 1;
              }
              $("#goodsNo").val(index);
            })
            //修改商品数量,失去焦点计算总数量
            $("#goodsNo").blur(function(){
               index = parseInt($(this).val())
                return index;
            })
            //点击 往购物车添加商品数量
            $("#jCard").click(function(){
              if(index >1){
                $('#catNum').html(index);
                index ++;
              } 
              if(index == 1){
                  $('#catNum').html(i);
                  i++;
              }           
              
            })
        

      
    }
  })//ajax请求结束
}
})

      
    
    
    
    
    
      // 商品评价 商品详情
      $('.tab-nav > .tab-item > .item').click(function () {
        $this = $(this);
        var index = $this.index();
        var $content_wrap = $this.parent('.tab-item').siblings('.tab-content');
        $this.addClass('active').siblings('.item').removeClass('active');
        $content_wrap.children('.content').eq(index).show().siblings('.content').hide();
      });

      
    



/*按钮加减 */
// $(".choose-attrs>.dd>.num").on("click","button",function(e){
//   var $btn=$(e.target);	
//   var $input=$(".choose-attrs>.dd>.num>input");
//   var $a=$input.val();
//   if($btn[0] == $input.next()[0]){
//     $a++;
//     $input.val($a);
//   }else if($a>1){
//     $a--;
//     $input.val($a);
//   }
// })

