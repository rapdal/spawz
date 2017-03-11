
var bootState = {
	create: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);	    
	    game.stage.backgroundColor = '#71c5cf';
	    game.state.start('load');	    	
	}
};