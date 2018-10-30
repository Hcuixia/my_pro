

var vm;
$(function(){
	$.ajax({
		url:"http://127.0.0.1:3000/index",
		type:"GET",
		dataType:"json",
		success: function(obj) {
			console.log(obj);
			vm = new Vue({
				el:"#boxx",
				data:{
					imgs:obj.imgs,
					product:obj.product
				},
				methods:{
					getDet(lid){
						window.location.href="http://127.0.0.1:3000/details.html?lid="+lid;
					}
					
				}
			})
		}
	})
})





jQuery(document).ready(function($){
    //banner 轮播
    $('.banner-wrap').zy_slide({
        auto_time: 4000,
        slide_radius: true
    });
    // 四个推荐
	recommend_four ();
})

// 四个推荐
function recommend_four () {
	$('.recommend-content > .item').zy_slide({
		show_num: 4,
		auto_time: 1800,
		slide_hover_stop: true
	});

	$('.recommend-tab .recommend-word').click(function () {
		$this = $(this);
		$('.recommend-tab>li').removeClass('cur');
		$this.parent('li').addClass('cur');

		var index = $this.parent('li').index();
		var one = -280;
		go(index*one);
	});

	function go (top) {
		$('.recommend-content').filter(':not(:animated)').animate({
			top: top+'px'
		});
	}	
}