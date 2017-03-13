
var gameoverState = {
	create: function () {
		background = game.add.sprite(0, 0, "bgmc1");
		background.width = 	game.width;
		background.height = game.height;
		
		var nameLabel = game.add.text(0, 0, 'GAME OVER', 
			{font:'20px Arial', fill:'#fff', boundsAlignH:'center'});
		nameLabel.setTextBounds(0, 80, game.world.width, 30);


		// var scoreText = score || 0;
		// var scoreLabel = game.add.text(0, 0, 'Your Score: ' + scoreText, 
		// 	{font:'23px Arial', fill:'#fff', boundsAlignH:'center'});
		// scoreLabel.setTextBounds(0, 140, game.world.width, 30);

		// var scoreText = game.add.text(0, 0, score, 
		// 	{font:'30px Arial', fill:'#fff', boundsAlignH:'center'});
		// scoreText.setTextBounds(0, 140, game.world.width, 30);
		// scoreText.text = score || 0;		

		var startLabel = game.add.text(0, 0, 'Press ENTER to start again.', 
			{font:'15px Arial', fill:'#fff', boundsAlignH:'center'});
		startLabel.setTextBounds(0, game.world.height-80, game.world.width, 30);
		
		var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		enterKey.onDown.addOnce(this.start, this);
	},

	start: function () {
		game.state.start('world');
	}
};
