var vm;
$(function(){  
	function loadPage(pno=0){
		if(location.search.indexOf("kw=")!=-1){
			var kw = decodeURI(location.search.split("=")[1]);
			$.ajax({
				url:"http://127.0.0.1:3000/products/",
				type:"get",
				data:{
					kw:kw,
					pno:pno},
				dataType:"json",
				success: function(obj) {
					//console.log(obj.pageCount)
					vm=new Vue({
						el:"#listComm",
						data:{
							pno:obj.pno,
							pageCount:obj.pageCount,
							products:obj.products
						},
						methods:{
							getDetail(lid){
								window.location.href="http://127.0.0.1:3000/details.html?lid="+lid;
							}
							
						}
					})
				}
			})
		}
	}
	loadPage();
	$("#listCommPage").on("click","a",function(e){
		e.preventDefault();
		var $a = $(e.target);
		if(!$a.is(".active")){
			$a.addClass("active")
			$a.addClass(" ")	
		}
		var pno = $a.html()-1;
		loadPage(pno)
	})

	
})