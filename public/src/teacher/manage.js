define(['jquery','../utils','template','form','datepicker', 'language', 'validate'],function($,utils,template){
	utils.setMenu('/teacher/teacher_list');

	//通过讲师id获取讲师信息
	var tc_id = utils.qs('tc_id'),
		teacher = $('#teacher'),
		html;

		// 将参数发送给服务端，服务端返回给前端数据
	// /teacher/edit
	// /api http://api.botue.com

	// 只有编辑操作才有必要发请求要数据
	// 添加操作则不需要
	if(tc_id){
		$.ajax({
			url:'/api/teacher/edit',
			type:'get',
			data:{tc_id:tc_id},
			success:function(info){
				console.log(111,info)
				if(info.code == 200){
					info.result.active = '讲师编辑';
					info.result.btnText = '修改';
					info.result.action = '/api/teacher/update';
					html = template('teacherTpl',info.result);
					teacher.html(html);

					validateForm();
				}
			}
		});
	}else{
		html = template('teacherTpl',{
			active : '讲师添加',
			action: '/api/teacher/add',
			btnText: '添 加',
			tc_gender: 0
		});
		teacher.html(html);
		validateForm();
	};


	// teacher.on('submit','form',function(){
	// 	$(this).ajaxSubmit({
	// 		// 不设置url，会默认读取form表单的action属性
	// 		// url: '/api/teacher/update',
	// 		type:'post',
	// 		success:function(info){
	// 			if(info.code == 200){
	// 				if(tc_id){
	// 					alert('修改成功!');
	// 				}else{
	// 					alert('添加成功!');
	// 				}
	// 			}
	// 		}
	// 	});
	// 	return false;
	// });

	function validateForm(){
		$('form').validate({
			sendForm:false,
			onKeyup:true,
			valid:function(){
				$(this).ajaxSubmit({
					type: 'post',
					success: function(info){
						if(info.code == 200){
							if(tc_id){
								alert('修改成功!');
							}else{
								alert('添加成功!');
							}
						}
					}
				})
			},
			eachValidField:function(){
				$(this).parents('.form-group')
					.removeClass('has-error')
					.addClass('has-success');
			},
			eachInvalidField:function(){
				$(this).parents('.form-group')
					.removeClass('has-success')
					.addClass('has-error');
			},
			description:{
				user:{
					required:'姓名不能为空!'
				}
			}
		})
	}

	// function validateForm() {

	// 	$('form').validate({
	// 		sendForm: false,
	// 		onKeyup: true,
	// 		valid: function () {
	// 			// 所有表单项都合法会调用
	// 			// 这时可以提交表单
	// 			// /teacher/update
	// 			// /api /http://api.botue.com
	// 			$(this).ajaxSubmit({
	// 				// 不设置url，会默认读取form表单的action属性
	// 				// url: '/api/teacher/update',
	// 				type: 'post',
	// 				success: function (info) {
	// 					// console.log(info);
	// 					if(info.code == 200) {
							
	// 						if(tc_id) {
	// 							alert('修改成功!');
	// 						} else {
	// 							alert('添加成功!');
	// 						}
	// 					}
	// 				}
	// 			});
	// 		},
	// 		eachValidField: function () {
	// 			// 为合法表单项提示信息
	// 			$(this).parents('.form-group')
	// 				.removeClass('has-error')
	// 				.addClass('has-success');
	// 		},
	// 		eachInvalidField: function () {
	// 			// 为不合法表单项提示信息
	// 			$(this).parents('.form-group')
	// 				.removeClass('has-success')
	// 				.addClass('has-error');
	// 		},
	// 		description: {
	// 			user: {
	// 				required: '姓名不能为空'
	// 			}
	// 		}
	// 	});
	// }

});