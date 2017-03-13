
var loadState = {
	preload: function () {
		game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;			
		// var b = this.game.load.image('birdie', 'assets/bird.png?v=1');				
		game.load.image('bgmc1', 'assets/bg-mc-1.png');
		game.load.image('bgtf1', 'assets/bg-tf-1.png');
		game.load.image('bgyn1', 'assets/bg-yn-1.png');

		game.load.json('questions', '../../assets/questions.json?v=2');
	},

	create: function () {		
		game.state.start('menu');
	}
};
