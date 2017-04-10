define(['jquery','template','nprogress','cookie'],function($,template,nprogress){

	if(location.pathname != '/login' && !$.cookie('PHPSESSID')){
		location.href = '/login';
	}

	$('#logout').on('click',function(){
		$.ajax({
			url: '/api/logout',
			type: 'post',
			success: function(info){
				if(info.code == 200){
					location.reload();
				}
			}
		})
	})

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	var loginfo = $.cookie('loginfo');

	var loginfo = loginfo && JSON.parse(loginfo);

	console.log(loginfo);

	var tpl =  '<div class="avatar img-circle">\
					<img src="{{tc_avatar}}">\
				</div>\
            	<h4>{{tc_name}}</h4>';

    var render = template.compile(tpl);
    var html = render(loginfo || {});
    $('.aside .profile').html(html);
                
    nprogress.start();
    nprogress.done();

    $(document).ajaxStart(function(){
    	$('.overlay').show();
    }).ajaxStop(function(){
    	setTimeout(function(){
    		$('.overlay').hide();
    	},300);
    })
})


            