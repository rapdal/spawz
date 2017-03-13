				
var worldState = {
	create: function () {			
		questionPanel = {       
		    x: (game.world.width * 0.15),
		    y: (game.world.height * 0.25),
		    width: game.world.width * 0.7,
		    height: 200,
		    borderwidth: 8,         
		    radius: 20,
		};

		questionsJSON = game.cache.getJSON('questions');				
		
		background = game.add.sprite(0, 0, "bgmc1");
		background.width = 	game.width;
		background.height = game.height;
		
		this.generateQuestion();	
	},	

	update: function() {	
		game.world.bringToTop(QAgroup);
	},	

	restart: function () {		
		getHighscores = false;
		game.state.start('gameover');
	},

	getRandomInt: function(min, max) {
	  	min = Math.ceil(min);
	  	max = Math.floor(max);
	  	return Math.floor(Math.random() * (max - min)) + min;
	},

	generateQuestion: function() {
		QAgroup = game.add.group();
		questionIndex = this.getRandomInt(0, questionsJSON.length);		
		this.addQuestion(questionsJSON[questionIndex]);	
	},

	addQuestion: function(item) {			
		var graphics = game.add.graphics(0, 0);		

		graphics.beginFill(color1, 1);
		graphics.drawRect(0, 0, game.width, 50);

		graphics.beginFill(color2, 1);
	    graphics.drawRoundedRect(
	    	questionPanel.x, 
	    	questionPanel.y, 
	    	questionPanel.width, 
	    	questionPanel.height,	    	
	    	questionPanel.radius
	    );
	    graphics.endFill();	

	    QAgroup.add(graphics);

	    var question = item.question;	

	    var questionText = game.add.text(0, 0, question,
	    	{ font:'20px Arial', fill:'#fff', boundsAlignH:'center', boundsAlignV:'middle',
	    	align:'center', wordWrap:true, wordWrapWidth: questionPanel.width-40 });
	    questionText.setTextBounds(questionPanel.x+10, questionPanel.y, questionPanel.width-10, questionPanel.height-10);	    

	    QAgroup.add(questionText);

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
	},

	addMultipleChoice: function(key, choice, num) {		
		var graphics = game.add.graphics(0, 0);		

		var circleDiameter = 50;	
		var circleRadius = circleDiameter / 2;
		var answerDistance = circleDiameter + 10;
	    var circleX = questionPanel.x + 55;
	    var circleY = (questionPanel.y + questionPanel.height + 60) + (answerDistance * num);
	   		    
	    var rectX = circleX - circleRadius + 5;
	    var rectY = circleY - circleRadius + 5;
	    var rectWidth = questionPanel.width - 60;
	    var rectHeight = circleDiameter - 10;
	    
	    graphics.lineStyle(0);
	    graphics.beginFill(color1, 1);
	    graphics.drawRoundedRect(rectX, rectY, rectWidth, rectHeight, 7);
	    
	    graphics.lineStyle(3, color1);
	    graphics.beginFill(color2, 1);
	    graphics.drawCircle(circleX, circleY, circleDiameter);
	    graphics.endFill();	 

	    graphics.inputEnabled = true; 
	    var _this = this;
        graphics.events.onInputDown.add(function () {         	
        	_this.checkAnswer(key);        	
        });  

	    QAgroup.add(graphics);

	    var choiceText = game.add.text(0, 0, choice,
	    	{ font:'21px Arial', fill:'#fff', boundsAlignV:'middle' });
	    choiceText.setTextBounds(rectX+circleDiameter+5, rectY+2, rectWidth, rectHeight);

	    QAgroup.add(choiceText);
	    
	    var keyText = game.add.text(0, 0, key,
	    	{ font:'26px Arial', fontWeight:'bolder', fill:"#fff", boundsAlignH:'center', boundsAlignV:'middle', align:'center' });
	    keyText.setTextBounds(circleX-circleRadius, circleY-circleRadius+2, circleDiameter, circleDiameter);	
	   
	    QAgroup.add(keyText);       	    
	},

	addTwoChoices: function(choice, num) {			
		var graphics = game.add.graphics(0, 0);		

		var circleDiameter = 130;	
		var circleRadius = circleDiameter / 2;
		var answerDistance = circleDiameter + 25;
				
	    var circleX = questionPanel.x + 70 + (answerDistance * num);
	    var circleY = (questionPanel.y + questionPanel.height + 110);		    
   		    
	    graphics.lineStyle(3, color1);
	    graphics.beginFill(color2, 1);
	    graphics.drawCircle(circleX, circleY, circleDiameter);
	    graphics.endFill();	 

	    graphics.inputEnabled = true; 
	    var _this = this;
        graphics.events.onInputDown.add(function () {          	
        	_this.checkAnswer(choice);        	
        });  

	    QAgroup.add(graphics);

	     var keyText = game.add.text(0, 0, choice,
	    	{ font:'26px Arial', fontWeight:'bolder', fill:"#fff", boundsAlignH:'center', boundsAlignV:'middle', align:'center' });
	    keyText.setTextBounds(circleX-circleRadius, circleY-circleRadius+2, circleDiameter, circleDiameter);	
	   
	    QAgroup.add(keyText);    		   	  
	},

	checkAnswer: function (answer) {		
		if (questionsJSON[questionIndex].answer == answer) {
			alert("Correct!");			
		}
		else {
			alert("Wrong!");
			playerLife--;
			if (playerLife < 1) {
				game.state.start('gameover');
			}
		}

		this.destroyGraphics(QAgroup);

		questionsJSON.splice(questionIndex, 1);

		this.generateQuestion();	
	},

	destroyGraphics: function(group) {		
		group.destroy();	
	}
}; 