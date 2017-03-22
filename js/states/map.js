
var mapState = {
	create: function () {	
		this.drawMenu();	

		var scale = game.world.width/705;
		mapSprite = game.add.tileSprite(0, 0, game.world.width, (7350*game.world.width)/705, 'map');	
		mapSprite.tileScale.x = scale;
		mapSprite.tileScale.y = scale;
		mapSprite.tilePosition.y = game.world.height/scale;	
		
		mapJSON = game.cache.getJSON('mapCoords');			
		this.addLevels();
	},

	update: function () {
		game.world.bringToTop(menuGroup);
	},

	drawMenu: function () {
		menuGroup = game.add.group();	

		var graphics = game.add.graphics(0, 0);	
		graphics.beginFill(color1, 1);
		graphics.drawRect(0, 0, game.width, 50);
		menuGroup.add(graphics);
		
		playerLifeSprite = game.add.sprite(game.world.top+10, 10, 'life'+playerLife);

		gameLevelText = game.add.text(game.world.right - 40, 10, gameLevel,
	    	{ font: fontFamily1, fontSize:'26px', fontWeight:'bolder', fill:'#fff' });

		menuGroup.add(playerLifeSprite);
		menuGroup.add(gameLevelText);	
	},

	addLevels: function () {		
		for (let x=0; x<gameLevel-1; x++) {
			this.addCompeleLevel(x);
		}
		this.addCurrentLevel();
	},

	addCompeleLevel: function (level) {
		var coords = mapJSON[level];					        

	   	var levelMask = game.add.graphics(0,0);	   	   
		levelMask.beginFill("black", 5);
	    levelMask.drawCircle(coords.x, coords.y, coords.diameter);	
	    levelMask.endFill();   
	    levelMask.alpha = 0.05;

	    levelMask.inputEnabled = true; 
	    var _this = this;
        levelMask.events.onInputDown.add(function () {         	
        	// _this.start();        	
        });  
	},

	addCurrentLevel: function () {
		var coords = mapJSON[gameLevel-1];

		var levelBorder = game.add.graphics(0,0);
		levelBorder.lineStyle(3, color1);	    		
	    levelBorder.drawCircle(coords.x, coords.y, coords.diameter);		        

	   	var levelMask = game.add.graphics(0,0);	   	   
		levelMask.beginFill(color2, 5);
	    levelMask.drawCircle(coords.x, coords.y, coords.diameter);	
	    levelMask.endFill();   
	    levelMask.alpha = 0.0;

	    levelMask.inputEnabled = true; 
	    var _this = this;
        levelMask.events.onInputDown.add(function () {         	
        	_this.start();        	
        });  
	},

	start: function () {	
		game.state.start('world');
	}
};