define(['jquery'],function($){
     return { 
     	setMenu:function(href){ 
     		$('.aside a[href = "'+href+'"]')
            .addClass('active')
            .parents('ul').show();
         },
         qs:function(key){
         	var search = location.search.slice(1);
         	search = search.split('&');
         	var obj = {};
         	for(var i = 0; i < search.length; i++){
         		var temp = search[i].split('=');
         		obj[temp[0]] = temp[1];
         	}
         	return obj[key];
        }
	}
})
