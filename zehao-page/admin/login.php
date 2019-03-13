<?php 

//载入配置文件
require_once '../config.php';

// 想要操作session,给用户找一个箱子,用户之前有就用之前的,没有就用新的
session_start();

function login() {
  // 接受并校验
  if (empty($_POST['email'])) {
    $GLOBALS['message'] = '请输入邮箱';
    return;
  }
  if (empty($_POST['password'])) {
    $GLOBALS['message'] = '请输入密码';
    return;
  }
  // 持久化(接收一下它)
  $email = $_POST['email'];
  $password = $_POST['password'];

  // // 相应   假数据校验:账号chenzehao@qq.com 密码:jwdbb
  // if ($email !== 'chenzehao@qq.com') {
  //   $GLOBALS['message'] = '邮箱与密码不匹配';
  //   return;
  // }
  // if ($password !== 'jwdbb') {
  //   $GLOBALS['message'] = '邮箱与密码不匹配';
  //   return;
  // }
  // 数据库操作:
  // 1. 建立连接
  $conn = mysqli_connect(CZH_DB_HOST,CZH_DB_USER,CZH_DB_PASS,CZH_DB_NAME);
  // 2. 判断是否连接成功
  if (!$conn) {
    exit('<h1>连接数据库失败</h1>');
  }


  $query = mysqli_query($conn, "select *from users where email = '{$email}' limit 1;");

  if(!$query) {
    $GLOBALS['message'] = '登录失败,请稍后重试!';
    return;
  }

  // 获取登录用户,得到关联数组
  $user = mysqli_fetch_assoc($query);

  if(!$user) {
    // 用户不存在
    $GLOBALS['message'] = '邮箱与密码不匹配';
    return;
  }

  if($user['password'] !== $password) {
    // 密码不正确
    $GLOBALS['message'] = '邮箱与密码不匹配';
    return;
  }

  //存一个登录标识(获取登录了的用户)
   // 为了以后可以直接拿到用户信息,这里直接将用户信息放置到session中
  $_SESSION['current_login_user'] = $user;

  //一切正确,可以跳转
  header('Location:/admin');
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  login();
}

?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Sign in &laquo; Admin</title>
  <link rel="stylesheet" href="/static/assets/vendors/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="/static/assets/css/admin.css">
  <link rel="stylesheet" href="/static/assets/vendors/animate/animate.css">
</head>
<body>
  <div class="login">
    <form class="login-wrap<?php echo isset($message) ? ' rubberBand animated' : ' bounceInLeft animated' ?> " action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" novalidate autocomplete="off">
      <img class="avatar" src="/static/assets/img/default.png">
      <!-- 有错误信息时展示 -->
      <?php if (isset($message)): ?>
        <div class="alert alert-danger">
          <strong>登录失败 :</strong> <?php echo $message; ?>
      </div>
      <?php endif ?>
      <div class="form-group">
        <label for="email" class="sr-only">邮箱</label>
        <input id="email" name="email" type="email" class="form-control" placeholder="邮箱" autofocus value="<?php echo empty($_POST['email']) ? '' : $_POST['email'] ?>">
      </div>
      <div class="form-group">
        <label for="password" class="sr-only">密码</label>
        <input id="password" name="password" type="password" class="form-control" placeholder="密码">
      </div>
      <button class="btn btn-primary btn-block">登 录</button>
    </form>
  </div>

  <script src="/static/assets/vendors/jquery/jquery.js"></script>

  <script>

  $(function($) {
    // 1. 单独作用域
    // 2. 确保页面加载过后执行

    // 时机: 邮箱文本框失去焦点
    // 事情: 获取这个文本框中填写的邮箱对应的头像地址,展示到上面的img元素上

    var emailFormat = /^[a-zA-Z]+@+[a-zA-Z]+\.[a-zA-Z]+$/

    $('#email').on('blur',function() {

      var value = $(this).val()

      // 忽略掉文本框内为空或者不是一个邮箱的情况
      if (!value || !emailFormat.test(value)) return

      // 用户输入了一个合理的邮箱地址
      // 获取这个文本框中填写的邮箱对应的头像地址,展示到上面的img元素上
      // 因为客户端的js无法直接操作数据库,应该通过js发送ajax请求,告诉服务的的某个接口,让接口帮助客户端获取头像地址
      $.get('/admin/api/avatar.php',{ email: value },function(res) {
        // 希望res===>这个邮箱对应的头像地址
        if(!res) return
        // 展示到上面的img元素上
        $('.avatar').fadeOut(function() {
          // 淡出完成执行
          $(this).on('load',function() {
            $(this).fadeIn()
          }).attr('src',res)
        })
      })
    })
  })

  </script>

</body>
</html>
