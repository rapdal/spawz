
var mapState = {
	create: function () {	
		var bgHeight = (7350*game.world.width)/705;

		game.world.setBounds(0, 0, game.world.width, 50 + bgHeight);			
		game.camera.y = bgHeight;

		this.drawMenu();		

		var scale = game.world.width/705;
		mapSprite = game.add.tileSprite(0, 50, game.world.width, (7350*game.world.width)/705, 'map');	
		mapSprite.tileScale.x = scale;
		mapSprite.tileScale.y = scale;	
		
		mapJSON = game.cache.getJSON('mapCoords');			
		this.addLevels();		
	},

	update: function () {
		menuGroup.y = game.camera.y;
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

		menuGroup.fixedToCamera = true;
	},

	addLevels: function () {		
		for (let x=0; x<gameLevel-1; x++) {
			this.addCompeletedLevel(x);
		}
		this.addCurrentLevel();		
	},

	addCompeletedLevel: function (level) {
		var coords = mapJSON[level];					

	   	var levelMask = game.add.graphics(0,0);	   	   
		levelMask.beginFill("black", 5);
	    levelMask.drawCircle(coords.x, coords.y, coords.diameter);	
	    levelMask.endFill();   
	    levelMask.alpha = 0.05;

	    levelMask.inputEnabled = true; 
	    var _this = this;
        levelMask.events.onInputDown.add(function () {         	
             	
        });  
	},

	addCurrentLevel: function () {
		if (!mapJSON[gameLevel-1]) {
			this.nolevel();
			return;
		}
		
		var coords = mapJSON[gameLevel-1];

		if (coords.up) {
			game.camera.y -= coords.up;
        }

		var levelBorder = game.add.graphics(0,0);
		levelBorder.lineStyle(4, color1);	    		
	    levelBorder.drawCircle(coords.x, coords.y, coords.diameter-4);		        

	   	var levelMask = game.add.graphics(0,0);	   	   
		levelMask.beginFill(color2, 5);
	    levelMask.drawCircle(coords.x, coords.y, coords.diameter);	
	    levelMask.endFill();   
	    levelMask.alpha = 0.0;

	    levelMask.inputEnabled = true; 
	    var _this = this;
        levelMask.events.onInputDown.add(function () {  
        	if (playerLife < 1) {
				_this.nolife();
			}
			else {       	
        		_this.start();        	
        	}
        });          
	},

	nolevel: function () {	
		gameLevel--;
		this.destroyGraphics(menuGroup);
		this.drawMenu();

		var overlayGraphics = game.add.graphics(0,0);
		overlayGraphics.beginFill('black', 1);
		overlayGraphics.drawRect(0, 0, game.world.width, game.world.height);
		overlayGraphics.endFill();
		overlayGraphics.alpha = 0.5;

		var overlayText = game.add.text(0, 0, "More levels coming soon!",
	    	{ font: fontFamily1, fontSize:'32px', fill:'#fff', boundsAlignH:'center', boundsAlignV:'middle',
	    	align:'center', wordWrap:true, wordWrapWidth: questionPanel.width-40 });
	    overlayText.setTextBounds(game.camera.x, game.camera.y+50, game.world.width, 284);	    	    	    
	},

	nolife: function () {
		var nolifeGroup = game.add.group();

		var overlayGraphics = game.add.graphics(0,0);
		overlayGraphics.beginFill('black', 1);
		overlayGraphics.drawRect(0, 0, game.world.width, game.world.height);
		overlayGraphics.endFill();
		overlayGraphics.alpha = 0.5;
		nolifeGroup.add(overlayGraphics);

	    var overlayText = game.add.text(0, 0, "No more life!",
	    	{ font: fontFamily1, fontSize:'32px', fill:'#fff', boundsAlignH:'center', boundsAlignV:'middle',
	    	align:'center', wordWrap:true, wordWrapWidth: questionPanel.width-40 });
	    overlayText.setTextBounds(game.camera.x, game.camera.y+50, game.world.width, 284);	    	    
	    nolifeGroup.add(overlayText);

	    var continueText = game.add.text(0, 0, 'Tap to continue...',
			{ font: fontFamily2, fontSize:'18px', fill:'#fff', boundsAlignH:'center', boundsAlignV:'middle' });
		continueText.setTextBounds(game.camera.x, game.camera.y+304, game.world.width, 20);
		nolifeGroup.add(continueText);
		
		overlayGraphics.inputEnabled = true; 
	    var _this = this;
        overlayGraphics.events.onInputDown.add(function () {           	
        	_this.destroyGraphics(nolifeGroup);
        });  

	},

	destroyGraphics: function(group) {		
		group.destroy();	
	},

	start: function () {	
		game.state.start('world');
	}
};