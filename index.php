<?php

	// print_r($_SERVER);

	// $pathinfo = $_SERVER["PATH_INFO"];

	// include './views' . $pathinfo . '.html';
	
	// 错误分成3个级别 notice warning error
	// wampserver 中集成的PHP 默认将所有级别的错误都提示了
	// 通过修改php的配置文件可以更改错误提示级别

	// 1、找到PHP的配置文件，通过 phpinfo();

	// phpinfo();
	// exit;
	
	// 2、找到配置文件php.ini，打开搜索error_reporting

	// 3、修改error_reporting = E_ALL & ~E_NOTICE

	// 4、重启服务器




	$pathinfo = $_SERVER['PATH_INFO'];
		// echo "$pathinfo";

	if($pathinfo){
		// explode用来将字符串拆成数组  同js中的split；
		// subsit用来截取字符串  同js中的split；
		$pathinfo = explode('/', substr($pathinfo, 1));
		// echo count($pathinfo);

		if(count($pathinfo)==1){
			$path = 'index/' . $pathinfo[0];
		}else{
			$path = $pathinfo[0] . '/' . $pathinfo[1];
		}
	}else{
		$path = 'index/index';
	}

	// echo $pathinfo;

	include './views/' . $path. '.html';