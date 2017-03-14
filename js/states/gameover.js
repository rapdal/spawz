
var gameoverState = {
	create: function () {
		background = game.add.sprite(0, 0, "bgmc1");
		background.width = 	game.width;
		background.height = game.height;

		var nameLabel = game.add.text(0, 0, 'GAME OVER', 
			{font:'20px Arial', fill:color1, boundsAlignH:'center'});
		nameLabel.setTextBounds(0, 80, game.world.width, 30);

		var scoreText = playerScore || 0;
		var scoreLabel = game.add.text(0, 0, 'Your Score: ' + scoreText, 
			{font:'23px Arial', fill:color1, boundsAlignH:'center'});
		scoreLabel.setTextBounds(0, 140, game.world.width, 30);

		var startLabel = game.add.text(0, 0, 'Press ENTER to start again.', 
			{font:'15px Arial', fill:'#fff', boundsAlignH:'center'});
		startLabel.setTextBounds(0, game.world.height-80, game.world.width, 30);
		
		var button = game.add.button(game.world.centerX - 98, game.world.bottom - 200, 'startbtn', this.start, this, 2, 1, 0);	
	},

	start: function () {
		game.state.start('world');
	}
};
