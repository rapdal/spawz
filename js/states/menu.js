
var menuState = {
	create: function () {	
		background = game.add.sprite(0, 0, "bgmc1");
		background.width = 	game.width;
		background.height = game.height;	
		
		$('#input-box').width($(window).width());
		$('#input-box').height($(window).height()*0.05);	
		$('#input-box').css('top', $(window).height()*0.75);
		$('#input-box input').css('font-size', $('#input-box').height()-20);

		var nameLabel = game.add.text(0, 0, 'DOG QUIZ', 
			{font:'20px Arial', fill:'#fff', boundsAlignH:'center'});
		nameLabel.setTextBounds(0, 80, game.world.width, 30);
		var startLabel = game.add.text(0, 0, 'Input Name. Press ENTER.', 
			{font:'15px Arial', fill:'#fff', boundsAlignH:'center'});
		startLabel.setTextBounds(0, game.world.height-80, game.world.width, 30);
		
		var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);	
		enterKey.onDown.addOnce(this.start, this);	

		$(window).resize(function () {
			console.log($('canvas').width())
		});		
	},

	start: function () {
		name = $('#username').val();				
		$('#username').hide();			
		game.state.start('world');
	}
};