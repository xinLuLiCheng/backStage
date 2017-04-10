define(['jquery','template','../utils'],function($,template,utils){
	utils.setMenu('/teacher/teacher_list');

	var teacherList = $("#teacherList"),
		teacherModal = $("#teacherModal"),
		html;

    $.ajax({
        url:'/api/teacher',
        type:'get',
        success:function(info){
            html = template('teacherTpl',{list:info.result});
            teacherList.html(html);
        }
    });

    teacherList.on('click','.preview',function(){
    	var _this = $(this),
    		td = _this.parent(),
    		tc_id = td.attr('data-id');

    	$.ajax({
    		url:'/api/teacher/view',
    		type:'get',
    		data:{tc_id:tc_id},
    		success:function(info){
    			console.log(info);
    			if(info.code == 200){
    				var hometown = info.result.tc_hometown = hometown.split('|');

    				html = template('modelTpl',info.result);

    				teacherModal.find('.panel-body').html(html);

    				teacherModal.modal();
    			}
    		}
    	});
    });
    teacherList.on('click','.handle',function(){
    	var _this = $(this),
			td = _this.parent(),
			tc_id = td.attr('data-id'),
			// 讲师当前的状态
			// 0 表示启用了，对应的文字“注销”
			// 1 表示注销了，对应的文字“启用”
			tc_status = td.attr('data-status');

		$.ajax({
			url:'/api/teacher/handle',
			type:'post',
			data:{tc_id:tc_id,tc_status:tc_status},
			success:function(info){
				console.log(info);
				if(info.code == 200){
					if(tc_status == 0){
						_this.text('启 用');
					}else{
						_this.text('注 销');
					}

					td.attr('data-status',info.result.tc_status)
				}
			}
		})
    })
})