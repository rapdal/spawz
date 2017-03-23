
var loadState = {
	preload: function () {		
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		if (this.game.device.desktop)  {
			game.scale.maxWidth = 414;
			game.scale.maxHeight = 736;
		}
		game.scale.refresh();

		game.load.image('bgmenu', 'assets/bg-menu.png');
		game.load.image('bgmc1', 'assets/bg-mc-1.png');
		game.load.image('bgtf1', 'assets/bg-tf-1.png');
		game.load.image('bgyn1', 'assets/bg-yn-1.png');
		game.load.image('bgans1', 'assets/bg-ans-1.png');

		game.load.image('logo', 'assets/logo.png');
		game.load.image('startbtn', 'assets/button-start.png');

		game.load.image('map', 'assets/map.png?v=1');		

		game.load.image('life0', 'assets/life-0.png?v=1');
		game.load.image('life1', 'assets/life-1.png?v=1');
		game.load.image('life2', 'assets/life-2.png?v=1');
		game.load.image('life3', 'assets/life-3.png?v=1');
		game.load.image('life4', 'assets/life-4.png?v=1');
		game.load.image('life5', 'assets/life-5.png?v=1');

		game.load.image('level', 'assets/level.png?v=1');
		game.load.image('mapend', 'assets/mapend.png?v=1');

		game.load.image('iconCorrect', 'assets/icon-correct.png?v=1');
		game.load.image('iconIncorrect', 'assets/icon-incorrect.png?v=1');

		game.load.json('mapCoords', '../../assets/map.json?v=1');
		game.load.json('questions', '../../assets/questions.json?v=1');
	},

	create: function () {		
		game.state.start('menu');
	}
};
