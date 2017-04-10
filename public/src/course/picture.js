define(['jquery', '../utils', 'template', 'uploadify', 'Jcrop', 'form'], function($, utils, template){
	utils.setMenu('/course/create');
	var cs_id = utils.qs('cs_id');

	$.ajax({
		url: '/api/course/picture',
		type: 'get',
		data: {cs_id: cs_id},
		success: function(info){
			var html = template('pictureTpl', info.result);
			$('#picture').html(html);

			//获取预览图片
			var preview = $('.preview img');

			var jcrop;

			//图片裁切
			function imgCrop(){

				//清除上一次
				if(jcrop) jcrop.destroy();

				//调用插件
				preview.Jcrop({
					boxWidth: 400,
					aspectRatio:2
				}, function(){
					var w = this.ui.stage.width,
						h = w / 2,
						x = 0,
						y = (this.ui.stage.height - h) / 2;
					//创建新裁切区域
					this.newSelection();
					this.setSelect([x, y, w, h]);

					jcrop = this;

					//缩略图
					this.initComponent('Thumbnailer', {
						width: 240,
						height: 120,
						thumb: '.thumb'
					})
				})
			};

			preview.parent().on('cropmove cropend', function(e, s, c){
				//通过c参数可以获取裁切后的尺寸
				//将裁切参数放在表单里
				$('#x').val(c.x);
				$('#y').val(c.y);
				$('#w').val(c.w);
				$('#h').val(c.h);
			})

			//处理图片（裁切、保存）
			$('#cutBtn .btn').on('click', function(){
				var _this = $(this),
					status = _this.attr('data-status');

				if(status == 'save'){
					//发送请求
					$('#coords').ajaxSubmit({
						url: '/api/course/update/picture',
						type: 'post',
						success: function(info){
							if(info.code == 200){
								location.href = '/course/chapter?cs_id=' + info.result.cs_id;
							}
						}
					})
				}else{
					_this.attr('data-status', 'save')
					.val('保存图片');

					imgCrop();

				}
			})

			$('#upfile').uploadify({
				buttonText: '选择图片',
				buttonClass: 'btn btn-success btn-sm',
				width: 80,
				height: 'auto',
				fileObjName: 'cs_cover_original',
				formData: {cs_id: cs_id},
				fileTypeExts: '*.gif; *.jpg; *.png',
				fileSizeLimit: '2MB',
				itemTemplate: '<span></span>',
				uploader: '/api/uploader/cover',
				swf: '/public/assets/uploadify/uploadify.swf',
				onUploadSuccess: function(file, info){
					info = JSON.parse(info);
					if(info.code == 200){
						preview.attr('src',info.result.path);

						imgCrop();

						//prop添加或删除属性 true表示添加 false表示删除
						$('#cutBtn .btn').prop('disabled', false).attr('data-status', 'save').val('保存图片');

					}
				}
			})
		}
	})
})