//小蛇的自调用函数
(function() {
	var elements=[];    //存放小蛇身体的每个部分,以便删除(定义各个小部分的在外面)

	//小蛇的构造函数
	function Snake(width,height,direction) {
		//小蛇每个部分的宽高
		this.width=width||20;
		this.height=height||20;
		//小蛇的身体
		this.body=[
			{x:3,y:2,color:"red"}, //头
			{x:2,y:2,color:"orange"}, //身体
			{x:1,y:2,color:"orange"} //身体
		];
		//方向
		this.direction=direction||"right";
	}

	//为原型添加方法--小蛇初始化的方法(画蛇)
	Snake.prototype.init=function(map) {
		//先删除之前的小蛇
		remove();
		//循环遍历,创建div,加入到地图中
		for(var i=0;i<this.body.length;i++) {			
			//数组中的每个元素都是一个对象
			var obj=this.body[i];
			var div=document.createElement("div");
			map.appendChild(div);
			div.style.position="absolute";
			//宽高
			div.style.width=this.width+"px";
			div.style.height=this.height+"px";
			//横纵坐标
			div.style.left=obj.x*this.width+"px";
			div.style.top=obj.y*this.height+"px";
			//背景颜色
			div.style.backgroundColor=obj.color;			
			//把div加入到elements数组中,方便删除
			elements.push(div); 
		}
	};


	//为原型添加方法--小蛇动起来
	Snake.prototype.move=function(food,map) {
		//改变小蛇身体的左边位置
		var i=this.body.length-1;   //得到身体的长度
		for(var i;i>0;i--) {
			this.body[i].x=this.body[i-1].x;
			this.body[i].y=this.body[i-1].y;
		}
		//判断方向,改变小蛇的蛇头坐标位置
		switch (this.direction) {
			case "right":this.body[0].x+=1;break;
			case "left":this.body[0].x-=1;break;
			case "top":this.body[0].y-=1;break;
			case "bottom":this.body[0].y+=1;break;
		}
		//判断有没有吃到食物
		//条件:小蛇的头部坐标=食物的坐标
		//小蛇的头部坐标
		var headX=this.body[0].x*this.width;
		var headY=this.body[0].y*this.height;
		//判断为吃到了
		if(headX==food.x&&headY==food.y) {
			//获取小蛇的尾巴
			var last=this.body[this.body.length-1];
			//把蛇尾复制一个,加入到小蛇的body中
			this.body.push({
				x:last.x,
				y:last.y,
				color:last.color
			});
			//把食物删除,重新初始化食物
			food.init(map);
		}
	};

	//删除小蛇的私有函数
	function remove() {
		//获取存放小蛇的数组
		var i=elements.length-1;
		for (;i>=0;i--) {
			//从当前的子元素中找到该子元素的父级元素,然后弄死这个子元素
			var ele=elements[i];
			ele.parentNode.removeChild(ele);
			elements.splice(i,1);
		}
	}
	//把Snake暴露给window
	window.Snake=Snake;
}());
