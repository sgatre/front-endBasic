var dom=document.getElementById("view");
var ctx=dom.getContext("2d");

var width=ctx.canvas.width;
var height=ctx.canvas.height;

var box_width=width*0.2;
var margin_width=width*0.04;

var digital=new Array();		//二维数组,记录每个格子的值
for ( var i = 0; i < 4; i++){
	digital[i] = new Array();
	for(var j = 0; j <4; j++){
		digital[i][j]=0;
	}
}

function drawRect(x, y, c){
	ctx.beginPath();
	ctx.fillStyle = c;
	ctx.moveTo(x,y);
	ctx.arcTo(x+box_width, y, x+box_width, y+1, margin_width*0.7);
	ctx.arcTo(x+box_width, y+box_width, x+box_width-1, y+box_width, margin_width*0.7);
	ctx.arcTo(x, y+box_width, x, y+box_width-1,margin_width*0.7);
	ctx.arcTo(x, y, x+1, y, margin_width*0.7);
	ctx.fill();
}

function drawBack(){
	ctx.beginPath();
	ctx.fillStyle="#000000";
	ctx.fillRect(0, 0, width, height);
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++){
			var c="";
			if(digital[i][j]==0){c="#FFFFFF ";}
			if(digital[i][j]==2){c="#FCFCFC ";}
			if(digital[i][j]==4){c="#E0E0E0 ";}
			if(digital[i][j]==8){c="#d0d0d0 ";}
			if(digital[i][j]==16){c="#ADADAD ";}
			if(digital[i][j]==32){c="#9D9D9D ";}
			if(digital[i][j]==64){c="#8E8E8E ";}
			if(digital[i][j]==128){c="#7B7B7B ";}
			if(digital[i][j]==256){c="#6C6C6C ";}
			if(digital[i][j]==512){c="#5B5B5B ";}
			if(digital[i][j]==1024){c="#4F4F4F ";}
			if(digital[i][j]==2048){c="#3C3C3C ";}
			x=margin_width+i*(box_width+margin_width);
			y=margin_width+j*(box_width+margin_width);
			drawRect(x, y, c);
		}
	}
}

//随机生成新2
function createRandom(){
	var x=Math.round(Math.random()*3);
	var y=Math.round(Math.random()*3);
	if (digital[x][y] == 0){
		digital[x][y] = 2;
	}
	else{
		createRandom();
	}
}

function drawDigital(){
	for (var i = 0; i < 4; i++){
		for (var j = 0; j < 4; j++){
			if (digital[i][j]>0){
				ctx.beginPath();
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillStyle = "red";
				ctx.font = "40px Arial";
				x = margin_width+i*(box_width+margin_width)+box_width/2;
				y = margin_width+j*(box_width+margin_width)+box_width/2;
				ctx.fillText(digital[i][j], x, y);
			}
		}
	}
}

//判断是否已经合法排列好
function checkDigital(arr){
	var flag = false;
	//判断所有数是否堆积在一侧，数和数中间不能有0
	if (arr[0]==0&&arr[1]==0&&arr[2]==0&&arr[3]==0||
		arr[0]!=0&&arr[1]==0&&arr[2]==0&&arr[3]==0||
		arr[0]!=0&&arr[1]!=0&&arr[2]==0&&arr[3]==0||
		arr[0]!=0&&arr[1]!=0&&arr[2]!=0&&arr[3]==0||
		arr[0]!=0&&arr[1]!=0&&arr[2]!=0&&arr[3]!=0){
		flag = true;
	}

	//判断每相邻两个数是否相等且不为0
	if (arr[0]==arr[1]&&arr[0]!=0||
		arr[1]==arr[2]&&arr[1]!=0||
		arr[2]==arr[3]&&arr[2]!=0||
		arr[3]==arr[4]&&arr[3]!=0
		){
		flag = false;
	}
	return flag;
}

//对数组进行移动操作
function changeDigital(arr){
	for (var i = 0; i < 3; i++){
		if (arr[i]==0){
			arr[i] = arr[i+1];
			arr[i+1]=0;
		}
	}
}

//清空数组
function clearDigital(arr){
	for (var i = 0; i < 4; i++){
		for (var j = 0; j < 4; j++){
			digital[i][j] = 0;
		}
	}
	return arr;
}
//对数组进行合并操作
function mergeDigital(arr){
	changeDigital(arr);
	
		if (arr[0] == arr[1]){
			arr[0] = arr[0] + arr[1];
			arr[1] = 0;
			changeDigital(arr);
			if (arr[1] == arr[2]){
				arr[1] = arr[1] + arr[2];
				arr[2] = 0;
			}
		}
		if (arr[1] == arr[2]){
			arr[1] = arr[1] + arr[2];
			arr[2] = 0;
		}
		if (arr[2] == arr[3]){
			arr[2] = arr[2] + arr[3];
			arr[3] = 0;
		}
	
	changeDigital(arr);
	return arr;
}

//检测是否游戏结束
function checkOver(){
	for (var i = 0; i < 4; i++){
		for (var j = 0; j < 4; j++){
			if (digital[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}

//按键事件
document.onkeydown = function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode == 37){
		for (var i = 0; i < 4; i++){
			var arr = new Array();
			arr[0] = digital[0][i];
			arr[1] = digital[1][i];
			arr[2] = digital[2][i];
			arr[3] = digital[3][i];
			if (!checkDigital(arr)){
				arr = mergeDigital(arr);
			}
			digital[0][i] = arr[0];
			digital[1][i] = arr[1];
			digital[2][i] = arr[2];
			digital[3][i] = arr[3];
		}
		if (checkOver()){

			alert("GAME OVER");
			
			clearDigital(arr);
		}
		ctx.clearRect(0, 0, width, height);	//重新画
		createRandom();
		drawBack();
		drawDigital();
	}
	//向上
	if(e && e.keyCode == 38){
		for (var i = 0; i < 4; i++){
			var arr = new Array();
			arr[0] = digital[i][0];
			arr[1] = digital[i][1];
			arr[2] = digital[i][2];
			arr[3] = digital[i][3];
			if (!checkDigital(arr)){
				arr = mergeDigital(arr);
			}
			digital[i][0] = arr[0];
			digital[i][1] = arr[1];
			digital[i][2] = arr[2];
			digital[i][3] = arr[3];
		}
		if (checkOver()){

			alert("GAME OVER");
			
			clearDigital(arr);
		}
		ctx.clearRect(0, 0, width, height);	//重新画
		createRandom();
		drawBack();
		drawDigital();
	}
	//向右
	if(e && e.keyCode == 39){
		for (var i = 0; i < 4; i++){
			var arr = new Array();
			arr[0] = digital[3][i];
			arr[1] = digital[2][i];
			arr[2] = digital[1][i];
			arr[3] = digital[0][i];
			if (!checkDigital(arr)){
				arr = mergeDigital(arr);
			}
			digital[3][i] = arr[0];
			digital[2][i] = arr[1];
			digital[1][i] = arr[2];
			digital[0][i] = arr[3];
		}
		if (checkOver()){
			alert("GAME OVER");
			clearDigital(arr);
		}
		ctx.clearRect(0, 0, width, height);	//重新画
		createRandom();
		drawBack();
		drawDigital();
	}
	//向下
	if(e && e.keyCode == 40){
		for (var i = 0; i < 4; i++){
			var arr = new Array();
			arr[0] = digital[i][3];
			arr[1] = digital[i][2];
			arr[2] = digital[i][1];
			arr[3] = digital[i][0];
			if (!checkDigital(arr)){
				arr = mergeDigital(arr);
			}
			digital[i][3] = arr[0];
			digital[i][2] = arr[1];
			digital[i][1] = arr[2];
			digital[i][0] = arr[3];
		}
		if (checkOver()){
			alert("GAME OVER");
			clearDigital(arr);
		}
		ctx.clearRect(0, 0, width, height);	//重新画
		createRandom();
		drawBack();
		drawDigital();
	}
}

createRandom();
drawBack();
drawDigital();