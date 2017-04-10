
define(['jquery','cookie'],function($){
		$('#loginForm').on('submit',function(){
            var formData = $(this).serialize();

            $.ajax({
                // url:'http://api.botue.com/login',
                url:'/api/login',
                type:'post',
                data:formData,
                success:function(info){
                    if(info.code == 200){
                        alert(info.msg);
                        $.cookie('loginfo',JSON.stringify(info.result));
                        location.href = '/';
                    }
                }
            })
            return false;
        })

})

