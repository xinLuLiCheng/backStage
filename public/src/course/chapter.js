define(['jquery', '../utils', 'template', 'validate', 'form'], function($, utils, template){
	
	//设置导航
	utils.setMenu('/course/create');
	//根据课程id获取课程信息
	var cs_id = utils.qs('cs_id'),
		html,
		chapter = $('#chapter'),
		chapterModal = $('#chapterModal'),
		lessonForm = $('#lessonForm');

	//发送请求
	$.ajax({
		url: '/api/course/lesson',
		type: 'get',
		data: {cs_id: cs_id},
		success: function(info){
			if(info.code == 200){
				html = template('chapterTpl', info.result);
				chapter.html(html);

				
			}
		}
	});

	//添加课时
	chapter.on('click', '.add', function(){
		html = template('lessonTpl', {
			title: '添加课时',
			btnText: '添 加',
			action: '/api/course/chapter/add'
		});

		chapterModal.find('.modal-content').html(html);

		validForm();

		//调用模态框
		chapterModal.modal();

	});

	chapter.on('click', '.edit', function(){
		var _this = $(this),
			parent = _this.parent(),
			ct_id = parent.attr('data-id');
		//发送请求 要数据
		$.ajax({
			url: '/api/course/chapter/edit',
			type: 'get',
			data: {ct_id: ct_id},
			success: function(info){
				if(info.code == 200){
					info.result.title = '编辑课时';
					info.result.btnText = '修 改';
					info.result.action = '/api/course/chapter/modify';
					//调用模板引擎
					html = template('lessonTpl', info.result);

					chapterModal.find('.modal-content').html(html);
					//调用模态框
					chapterModal.modal();

					validForm();

				}
			}
		})
	})

	

	function validForm(){
		//验证并提交表单
		$('#lessonForm').validate({
			sendForm: false,
			valid: function(){

				var is_free = $('.free')[0].checked ? 1 : 0;

				$(this).ajaxSubmit({
					//当不填写url时，表单会自动查找当前表单的action属性
					type: 'post',
					data: {ct_cs_id: cs_id , ct_is_free: is_free},
					success: function(info){
						if(info.code == 200){
							chapterModal.modal('hide');
						}
					}
				})
			}
		});	
	}


	
})