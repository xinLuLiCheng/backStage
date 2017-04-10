define(['jquery','template'],function($,template){
	$.ajax({
		url:'/api/teacher',
		type:'get',
		success:function(info){
			console.log(info);
			var html = template('userListTpl',{list:info.result});
			$("#userList").html(html);
		}
	})
})