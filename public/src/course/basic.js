define(['jquery', '../utils', 'template', 'ckeditor', 'validate', 'form'], function($, utils, template, CKEDITOR){

	utils.setMenu('/course/create');

	var cs_id = utils.qs('cs_id'),
		basic = $('#basic'),
		html;

	$.ajax({
		url: '/api/course/basic',
		type: 'get',
		data: {cs_id: cs_id},
		success: function(info){
			html = template('basicTpl', info.result);
			basic.html(html);

			CKEDITOR.replace('ckeditor',{});

			$('#basicForm').validate({
				sendForm: false,
				valid: function(){
					for(instance in CKEDITOR.instances) {
						CKEDITOR.instances[instance].updateElement();
					}
					$(this).ajaxSubmit({
						url: '/api/course/update/basic',
						type: 'post',
						success: function(info){
							if(info.code == 200){
								location.href = '/course/picture?cs_id=' + info.result.cs_id;
							}
						}
					})
				}
			})
		}
	});

	basic.on('change', 'select.top', function(){
		var _this = $(this);
		$.ajax({
			url: '/api/category/child',
			type: 'get',
			data: {cg_id:$(this).val()},
			success: function(info){
				if(info.code == 200){
					var tpl = `{{each opts}}
								<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>
								{{/each}}`;
					var render = template.compile(tpl);
					html = render({opts: info.result});
					_this.next().html(html);


				}
			}
		})
	})
})