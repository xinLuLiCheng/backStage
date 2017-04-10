define(['jquery','../utils', 'template'], function($, utils, template){
	 utils.setMenu('/course/list');

	$.ajax({
		url: '/api/course',
		type: 'get',
		success: function(info){
			console.log(info);
			if (info.code == 200) {
				var html = template('courseTpl', {list: info.result});
				$('#courses').append(html);
			}
		}
	})

})




