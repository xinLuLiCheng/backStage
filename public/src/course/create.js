define(['jquery', '../utils', 'validate', 'form'], function($, utils){

	utils.setMenu('/course/create');

	$('#createForm').validate({
		sendForm: false,
		valid: function(){
			$(this).ajaxSubmit({
				url: '/api/course/create',
				type: 'post',
				success: function(info){
					if(info.code == 200){
						location.href = '/course/basic?cs_id=' + info.result.cs_id;
					}
				}
			})
		}
	})
})