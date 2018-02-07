$(document).ready(function() {
	var canvas = $("#gameCanvas");
	var context = canvas.get(0).getContext("2d");

	// 画布尺寸
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	// 游戏设置
	var playGame;
	var platformX;
	var platformY;
	var platformOuterRadius;
	var platformInnerRadius;

	var ui = $("#gameUI");
		var uiIntro = $("#gameIntro");
		var uiStats = $("#gameStats");
		var uiComplete = $("#gameComplete");
		var uiPlay = $("#gamePlay");
		var uiReset = $(".gameReset");
		var uiRemaining = $("#gameRemaining");
		var uiScore = $(".gameScore");

	// 重置和重启游戏
	function startGame() {
		// 初始化游戏设置
		uiScore.html("0");
		uiStats.show();
		playGame = false;
		platformX = canvasWidth/2;
		platformY = 150;
		platformOuterRadius = 100;
		platformInnerRadius = 75;

		// 开始动画循环
		animate();
	};

	// 初始化游戏环境
	function init() {
		uiStats.hide();
		uiComplete.hide();

		uiPlay.click(function(e) {
			e.preventDefault();
			uiIntro.hide();
			startGame();
		});

		uiReset.click(function(e) {
			e.preventDefault();
			uiComplete.hide();
			startGame();
		});
	};

	// 动画循环，游戏的趣味性就在这里
	function animate() {
		// 清除
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		context.fillStyle = "rgb(100, 100, 100)";
		context.beginPath();
		context.arc(platformX, platformY, platformOuterRadius, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
		if (playGame) {
			// 33毫秒后再次运行动画循环
			setTimeout(animate, 33);
		};
	};
	init();
});