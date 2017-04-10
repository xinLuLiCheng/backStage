define(['jquery','template','ckeditor','datepicker','language','region','validate','form','uploadify'],function($,template,CKEDITOR){

	var html,
		profile = $('#profile');
	$.ajax({
		url:'/api/teacher/profile',
		type:'get',
		success:function(info){
			console.log(info);
			if(info.code == 200){
				html = template('profileTpl', info.result);
				profile.html(html);

				$('.hometown').region({
					url:'/public/assets/jquery-region/region.json'
				});

				CKEDITOR.replace('ckeditor', {
					toolbarGroups: [
						{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
						{ name: 'links' },
						{ name: 'insert' },
						{ name: 'forms' },
						{ name: 'tools' },
						{ name: 'others' }
					]
				});

				$('form').validate({
					onBlur: true,
					sendForm: false,
					valid: function(){
						for(instance in CKEDITOR.instances) {
							CKEDITOR.instances[instance].updateElement();
						};
						$(this).ajaxSubmit({
							url:'/api/teacher/modify',
							type: 'post',
							success: function(info){
								console.log(info);
								if(info.code == 200){
									alert('修改成功！');
								}
							}
						})
					}
				})

				$('#upfile').uploadify({
					buttonText: '',
					width: 120,
					height: 120,
					//服务器接收参数
					fileObjName:'tc_avatar',
					itemTemplate:'<span></span>',
					uploader:'/api/uploader/avatar',
					swf:'/public/assets/uploadify/uploadify.swf',
					onUploadSuccess:function(file,data){
						data = JSON.parse(data);
						console.log(data);
						
						if(data.code == 200){
							$('.preview img').attr('src',data.result.path);
						}
					}

				});

			}
		}
	})
})