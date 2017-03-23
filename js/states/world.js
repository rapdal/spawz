				
var worldState = {
	create: function() {	
		game.camera.y = 0;

		this.drawMenu();

		questionTimer = game.time.events;

		questionPanel = {       
		    x: (game.world.width * 0.15),
		    y: (game.world.top + 175),
		    width: game.world.width * 0.7,
		    height: 200,
		    borderwidth: 8,         
		    radius: 20,
		};		

		questionsJSON = game.cache.getJSON('questions');				
		
		background = game.add.sprite(0, 50, "bgmc1");
		background.width = 	game.width;
		background.height = game.height-50;		
						
		this.generateQA();	
	},	

	update: function() {	
		menuGroup.y = game.camera.y;
		game.world.bringToTop(qaGroup);
		game.world.bringToTop(answerGroup);
		game.world.bringToTop(menuGroup);		
	},		

	drawMenu: function() {
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

	getRandomInt: function(min, max) {
	  	min = Math.ceil(min);
	  	max = Math.floor(max);
	  	return Math.floor(Math.random() * (max - min)) + min;
	},

	generateQA: function() {		
		qaGroup = game.add.group();	
		answerGroup = game.add.group();
		questionIndex = this.getRandomInt(0, questionsJSON.length);		
		this.addQuestion(questionsJSON[questionIndex]);	
	},

	addQuestion: function(item) {	
		var levelSprite = game.add.sprite(questionPanel.x+10, questionPanel.y-50, 'level');
		levelSprite.width = 58; levelSprite.height = 50;
		qaGroup.add(levelSprite);

		var levelText = game.add.text(0, 0, gameLevel,
			{ font:fontFamily2, fontSize:'24px', fill:'#fff', boundsAlignH:'center', boundsAlignV:'middle',
	    	align:'center', wordWrap:true, wordWrapWidth: questionPanel.width-40 });
	    levelText.setTextBounds(questionPanel.x+25, questionPanel.y-23, 25, 20);	    
	    qaGroup.add(levelText);

		var questionGraphics = game.add.graphics(0, 0);			
		questionGraphics.lineStyle(5, color1);
		questionGraphics.beginFill(color2, 5);
	    questionGraphics.drawRoundedRect(
	    	questionPanel.x, 
	    	questionPanel.y, 
	    	questionPanel.width, 
	    	questionPanel.height,	    	
	    	questionPanel.radius
	    );
	    questionGraphics.endFill();	
	    qaGroup.add(questionGraphics);

	    var question = item.question;	
	    var questionText = game.add.text(0, 0, question,
	    	{ font: fontFamily1, fontSize:'20px', fill:'#fff', boundsAlignH:'center', boundsAlignV:'middle',
	    	align:'center', wordWrap:true, wordWrapWidth: questionPanel.width-40 });
	    questionText.setTextBounds(questionPanel.x+10, questionPanel.y, questionPanel.width-10, questionPanel.height-10);	    
	    qaGroup.add(questionText);

	    var timerGraphics = game.add.graphics(0, 0);	
	    var circleDiameter = 40;	
		var circleRadius = circleDiameter / 2;		
	    var circleX = questionPanel.x;
	    var circleY = questionPanel.y+questionPanel.height;
	    timerGraphics.lineStyle(3, color1);
	    timerGraphics.beginFill(color2, 1);
	    timerGraphics.drawCircle(circleX, circleY, circleDiameter);
	    timerGraphics.endFill();	 
	    answerGroup.add(timerGraphics);

	    questionTime = questionTimeDefault;	
		questionTimerText = game.add.text(0, 0, questionTime,
			{ font: fontFamily1, fontSize:'20px', fontWeight: "bolder", fill: '#f53', boundsAlignH:'center', boundsAlignV:'middle', });	
		questionTimerText.setTextBounds(questionPanel.x-25, questionPanel.y+questionPanel.height-23, 50, 50);	 
		answerGroup.add(questionTimerText);   		

	   if (item.type == 'mc') {	   
			var num = 0;
			for (var key in item.choices) {		
				 this.addMultipleChoice(key, item.choices[key], num);
				 num++;
			}
		}
		else {
			for (var i=0; i<2; i++) {
				this.addTwoChoices(item.choices[i], i);
			}
		}	

		this.startTimer();
	},

	startTimer: function() {
		var _this = this;
		questionTime = questionTimeDefault;			
		questionTimer.repeat(1000, questionTimeDefault, function(){ _this.updateTime() });
		questionTimer.start();
	},

	updateTime: function() {										
		questionTime--;
		questionTimerText.setText(questionTime);
		if (questionTime < 1) {
			this.checkAnswer('Wrong Answer');		
		}
	},

	addMultipleChoice: function(key, choice, num) {		
		var choiceGraphics = game.add.graphics(0, 0);		

		var circleDiameter = 50;	
		var circleRadius = circleDiameter / 2;
		var answerDistance = circleDiameter + 10;
	    var circleX = questionPanel.x + 55;
	    var circleY = (questionPanel.y + questionPanel.height + 60) + (answerDistance * num);
	   		    
	    var rectX = circleX - circleRadius + 5;
	    var rectY = circleY - circleRadius + 5;
	    var rectWidth = questionPanel.width - 60;
	    var rectHeight = circleDiameter - 10;
	    
	    choiceGraphics.lineStyle(0);
	    choiceGraphics.beginFill(color1, 1);
	    choiceGraphics.drawRoundedRect(rectX, rectY, rectWidth, rectHeight, 7);
	    
	    choiceGraphics.lineStyle(3, color1);
	    choiceGraphics.beginFill(color2, 1);
	    choiceGraphics.drawCircle(circleX, circleY, circleDiameter);
	    choiceGraphics.endFill();	 

	    choiceGraphics.inputEnabled = true; 
	    var _this = this;
        choiceGraphics.events.onInputDown.add(function () {         	
        	_this.checkAnswer(key);        	
        });  

	   	answerGroup.add(choiceGraphics);

	    var choiceText = game.add.text(0, 0, choice,
	    	{ font: fontFamily1, fontSize:'21px', fill:'#fff', boundsAlignV:'middle' });
	    choiceText.setTextBounds(rectX+circleDiameter+5, rectY+2, rectWidth, rectHeight);
	    answerGroup.add(choiceText);
	    
	    var keyText = game.add.text(0, 0, key,
	    	{ font: fontFamily1, fontSize:'26px', fontWeight:'bolder', fill:"#fff", boundsAlignH:'center', boundsAlignV:'middle', align:'center' });
	    keyText.setTextBounds(circleX-circleRadius, circleY-circleRadius+2, circleDiameter, circleDiameter);	
	    answerGroup.add(keyText);       	    
	},

	addTwoChoices: function(choice, num) {			
		var choiceGraphics = game.add.graphics(0, 0);		

		var circleDiameter = 125;	
		var circleRadius = circleDiameter / 2;
		var answerDistance = circleDiameter + 25;
				
	    var circleX = questionPanel.x + 70 + (answerDistance * num);
	    var circleY = (questionPanel.y + questionPanel.height + 110);		    
   		    
	    choiceGraphics.lineStyle(10, color1);
	    choiceGraphics.beginFill(color2, 1);
	    choiceGraphics.drawCircle(circleX, circleY, circleDiameter);
	    choiceGraphics.endFill();	 

	    choiceGraphics.inputEnabled = true; 
	    var _this = this;
        choiceGraphics.events.onInputDown.add(function () {          	
        	_this.checkAnswer(choice);        	
        });  

	    answerGroup.add(choiceGraphics);

	    var keyText = game.add.text(0, 0, choice,
	    	{ font:'26px Arial', fontWeight:'bolder', fill:"#fff", boundsAlignH:'center', boundsAlignV:'middle', align:'center' });
	    keyText.setTextBounds(circleX-circleRadius, circleY-circleRadius+2, circleDiameter, circleDiameter);	
	   
	    answerGroup.add(keyText);    		   	  
	},

	checkAnswer: function(answer) {	
		questionTimer.stop();

		var isCorrect = 'Incorrect';	
		// Correct
		if (questionsJSON[questionIndex].answer == answer) {
			isCorrect = 'Correct';
			playerScore += 10;						
		}
		// Incorrect
		else {			
			playerLife--;
			this.updatePlayerLife();
		}				
	
		this.displayCaption(isCorrect);		
	},

	displayCaption: function(isCorrect) {		
		this.destroyGraphics(answerGroup);

		var overlayGraphics = game.add.graphics(0, 0);			
		overlayGraphics.beginFill('0xEFE4AC', 1);
		overlayGraphics.drawRect(0, 50, game.world.width, game.world.height);
		overlayGraphics.endFill();	
		overlayGraphics.alpha = 0.5;	
		qaGroup.add(overlayGraphics);				

		var captionPanel = {
			x: questionPanel.x - 10,
			y: questionPanel.y + questionPanel.height + 50 ,
			width: questionPanel.width + 20, 
			height: questionPanel.height / 2,	    				
		}

		var correctText = game.add.text(0, 0, isCorrect,
			{ font: fontFamily1, fontSize:'32px', fontWeight:'bolder', fill:color1, boundsAlignH:'center', boundsAlignV:'middle',
			align:'center', wordWrap:true, wordWrapWidth:questionPanel.width-40 });		
		correctText.setTextBounds(questionPanel.x, questionPanel.y+questionPanel.height-60, questionPanel.width, questionPanel.height/3);		
		qaGroup.add(correctText);
				
		correctText.pivot.x -= 17.5;
		var correctSprite = game.add.sprite(Math.abs(correctText.pivot.x)-35, Math.abs(correctText.pivot.y), 'icon'+isCorrect);
		correctSprite.width = 30; correctSprite.height = 40;
		qaGroup.add(correctSprite);

		var captionGraphics = game.add.graphics(0,0);
		captionGraphics.lineStyle(3, color2);		
	    captionGraphics.drawRoundedRect(
	    	captionPanel.x, 
	    	captionPanel.y, 
	    	captionPanel.width,
	    	captionPanel.height,	    	
	    	questionPanel.radius
	    );	    
	    qaGroup.add(captionGraphics);

	    var captionText = game.add.text(0, 0, questionsJSON[questionIndex].caption,
	    	{ font: fontFamily1, fontSize:'17px', fill:color1, boundsAlignH:'center', boundsAlignV:'middle',
			align:'center', wordWrap:true, wordWrapWidth:questionPanel.width-40 });
		captionText.setTextBounds(captionPanel.x, captionPanel.y+5, captionPanel.width, captionPanel.height);
		qaGroup.add(captionText);	

		var continueText = game.add.text(0, 0, 'Tap to continue...',
			{ font: fontFamily2, fontSize:'17px', fill:color1, boundsAlignH:'center', boundsAlignV:'middle' });
		continueText.setTextBounds(captionPanel.x, captionPanel.y+captionPanel.height+30, captionPanel.width, 20);
		qaGroup.add(continueText);	

		var tapGraphics = game.add.graphics(0, 0);
		tapGraphics.beginFill(color1, 1);		
		tapGraphics.drawRect(0, 50, game.world.width, game.world.height);		
		tapGraphics.alpha = 0;
		qaGroup.add(tapGraphics);
		tapGraphics.inputEnabled = true; 
	    var _this = this;
        tapGraphics.events.onInputDown.add(function () {           	
        	_this.destroyGraphics(qaGroup);

        	if (isCorrect == "Correct") {
	        	gameLevel++;  
	        }    		

	        game.state.start('map'); 
        });  

		questionsJSON.splice(questionIndex, 1);		
	},

	updatePlayerScore: function () {		
		playerScoreText.setText(playerScore);
	},

	updatePlayerLife: function () {		
		playerLifeSprite.loadTexture('life'+playerLife);
	},

	destroyGraphics: function(group) {		
		group.destroy();	
	}
}; 