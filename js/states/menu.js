
var menuState = {
	create: function () {	
		var menuSprite = game.add.sprite(0, 0, "bgmenu");
		menuSprite.width = 	game.width;
		menuSprite.height = game.height;	
		
		$('#input-box').width($(window).width());
		$('#input-box').height($(window).height()*0.05);	
		$('#input-box').css('top', $(window).height()*0.75);
		$('#input-box input').css('font-size', $('#input-box').height()-20);

		var logoSprite = game.add.sprite(game.world.centerX-107, game.world.centerY-87, 'logo');
		logoSprite.width = 214; logoSprite.height = 87;	

		var button = game.add.button(game.world.centerX-92, game.world.centerY+7, 'startbtn', this.start, this, 2, 1, 0);	    
		button.width = 184; button.height = 57;

		var buttonText = game.add.text(0, 0, 'Start',
			{ font:'Arial', fontSize:'32px', fill:'#fff', boundsAlignH:'center', boundsAlignV:'middle' });
	    buttonText.setTextBounds(game.world.centerX-92, game.world.centerY+9, 184, 57);	  

		$(window).resize(function () {
			console.log($('canvas').width())
		});		
	},

	start: function () {
		name = $('#username').val();				
		$('#username').hide();		

		game.state.start('map');
	}
};
