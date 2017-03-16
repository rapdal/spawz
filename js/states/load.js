
var loadState = {
	preload: function () {		
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.refresh();

		game.load.image('bgmc1', 'assets/bg-mc-1.png');
		game.load.image('bgtf1', 'assets/bg-tf-1.png');
		game.load.image('bgyn1', 'assets/bg-yn-1.png');

		game.load.image('startbtn', 'assets/start.png')

		game.load.image('life1', 'assets/life-1.png?v=1');
		game.load.image('life2', 'assets/life-2.png?v=1');
		game.load.image('life3', 'assets/life-3.png?v=1');
		game.load.image('life4', 'assets/life-4.png?v=1');
		game.load.image('life5', 'assets/life-5.png?v=1');

		game.load.json('questions', '../../assets/questions.json?v=1');
	},

	create: function () {		
		game.state.start('menu');
	}
};
