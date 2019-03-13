//食物的自调用函数
(function() {
	//食物就是一个对象,有宽高 颜色 横纵坐标
	//先定义构造函数 然后创建食物对象
	function Food(x,y,width,height,color) {
		this.x=x||0;
		this.y=y||0;
		this.width=width||20;
		this.height=height||20;
		this.color=color||"green";
	}
	//添加初始化方法→在页面上显示食物,由于需要多次调用,所以加在原型中
	//因为食物要在地图上显示,所以需要地图参数
	Food.prototype.init=function(map) {
		//每次初始化的时候都先删除一次,保证只创建一个食物
		//外部无法访问的函数
		remove();
		//创建div
		var div=document.createElement("div");
		//把div添加到地图map中
		map.appendChild(div);
		//设置div的样式
		div.style.width=this.width+"px";
		div.style.height=this.height+"px";
		div.style.backgroundColor=this.color;
		//脱离文档流
		div.style.position="absolute";
		//随机坐标
		this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
		this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
		div.style.left=this.x+"px";
		div.style.top=this.y+"px";
		//把div加入到数组elements中,将来可以通过这个数组找到食物,以便删除
		elements.push(div);
	};

	var elements=[];  //用来保存每个小方块食物的数组 以便删除食物
	//定义一个删除食物的私有函数(外部不能访问)
	function remove() {
		//elements数组中有这个食物
		for(var i=0;i<elements.length;i++) {
			var ele=elements[i];
			//找到这个子元素的父级元素,然后从地图上删除这个子元素
			ele.parentNode.removeChild(ele);
			//从数组中把这个子元素也要删除
			elements.splice(i,1);
		}
	} 

	//由于正常情况下自调用函数里面的函数Food在外边无法使用
	//把Food暴露给window
	window.Food=Food;
}());