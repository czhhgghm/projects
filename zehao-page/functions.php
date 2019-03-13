<?php 

require_once 'config.php';

// 封装公用的函数
session_start();

// 获取当前用户的登录信息,如果没有获取到则自动跳转到登录页面
function zh_get_current_user() {
	if (empty($_SESSION['current_login_user'])) {
		header('Location:/admin/login.php');
		exit();
	}
	return $_SESSION['current_login_user'];
}

// 通过一个数据库查询,获取数据
function czh_fetch($sql) {
	$conn = mysqli_connect(CZH_DB_HOST,CZH_DB_USER,CZH_DB_PASS,CZH_DB_NAME);
	if (!$conn) {
		// 连接失败
		exit('连接数据库失败');
	}
	$query = mysqli_query($conn, $sql);
	if (!$query) {
		// 查询失败
		return false;
	}
	while ($row = mysqli_fetch_assoc($query)) {
		$result[] = $row;
	}

	return $result;

}