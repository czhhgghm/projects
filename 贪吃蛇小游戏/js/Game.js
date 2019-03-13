//游戏的自调用函数
(function() {
	//定义一个变量,用于存放this
	var that=null;

	//游戏的构造函数
	function Game(map) {
		this.food=new Food(); //食物对象存到属性
		this.snake=new Snake(); //小蛇对象存到属性
		this.map=map;  //地图
		that=this;    //把当前的实例对象保存到that中
	}

	//初始化游戏 可以显示小蛇和食物
	Game.prototype.init=function(map) {
		//食物初始化
		this.food.init(this.map);
		//小蛇初始化
		this.snake.init(this.map);

		// //这段代码不在这里写,目的是尽可能做到一个方法只做一件事
		// setInterval(function() {
		// 	that.snake.move(that.food,that.map);   //走一步
		// 	that.snake.init(that.map);  //画
		// },150);

		//调用小蛇自动移动的方法
		this.runSnake(this.food,this.map);

		//调用按键的方法
		this.bindKey();
	};

	//添加原型方法,让小蛇可以自动跑起来
	Game.prototype.runSnake=function(food,map) {
		//自动移动
		var timeId=setInterval(function() {
			//不加.bind(that)时的this是window,会报错
			//移动小蛇
			this.snake.move(food,map);
			//初始化小蛇
			this.snake.init(map);
			//获取横坐标的最大值
			var maxX=map.offsetWidth/this.snake.width;
			//获取纵坐标的最大值
			var maxY=map.offsetHeight/this.snake.height;
			//获取小蛇蛇头的坐标
			var headX=this.snake.body[0].x;
			var headY=this.snake.body[0].y;
			//添加撞到四周墙的条件
			if(headX<0||headX>=maxX) {
				clearInterval(timeId);
				alert("游戏结束,再接再厉呀");
			}
			if(headY<0||headY>=maxY) {
				clearInterval(timeId);
				alert("游戏结束,再接再厉呀");
			}
		}.bind(that),150);   //添加.bind(that),用传入的that代替当前函数里面的this
	};

	//添加原型方法,通过按键值改变小蛇移动的方向
	Game.prototype.bindKey=function() {
		//获取用户的按键 改变小蛇的方向
		document.addEventListener("keydown",function(e) {
			//此时的this不是Game的实例对象gm 而是调用这个事件的对象---document
			//所以还是要添加.bind(that)
			switch(e.keyCode) {
				case 37: this.snake.direction="left";break;
				case 38: this.snake.direction="top";break;
				case 39: this.snake.direction="right";break;
				case 40: this.snake.direction="bottom";break;
			}
		}.bind(that),false);   //此处添加
	};

	//暴露给window 让外部可以访问Game对象
	window.Game=Game;
}());