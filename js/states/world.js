				
var worldState = {
	create: function () {	
		QAgroup = game.add.group();

		questionPanel = {       
		    x: (game.world.width*0.5) - 125,
		    y: (game.world.height*0.5) - 140,
		    width: 250,
		    height: 200,
		    borderwidth: 8,         
		    radius: 20,
		};

		questionsJSON = game.cache.getJSON('questions');

		questionIndex = 0;		

		// while(life > 0) {			
		// 	var randomIndex = this.getRandomInt(0, questionsJSON.length);
		// 	var randomQuestion = questionsJSON[randomIndex];
		// 	switch (randomQuestion.type) {
		// 		case 'mc':
		// 			this.add_question_mc(randomQuestion);
		// 			break;
		// 		case 'tf':
		// 			this.add_question_tf(randomQuestion);
		// 			break;
		// 		case 'yn':
		// 			this.add_question_tf(randomQuestion);
		// 			break;
		// 		default:
		// 			break;
		// 	}
		// 	questionsJSON.splice(randomIndex, 1);			
		// 	life--;
		// }

		background = game.add.sprite(0, 0, "bgmc1");
		background.width = 	game.width;
		background.height = game.height;
		
		this.add_question_mc(questionsJSON[questionIndex]);		
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

	add_question_mc: function(item) {			
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
	    	{ font:'18px Arial', fill:'#fff', boundsAlignH:'center', boundsAlignV:'middle',
	    	align:'center', wordWrap:true, wordWrapWidth: questionPanel.width-40 });
	    questionText.setTextBounds(questionPanel.x+10, questionPanel.y, questionPanel.width-10, questionPanel.height-10);	    

	    QAgroup.add(questionText);

		var num = 0;
		for (var key in item.choices) {		
			 this.add_choices_mc(key, item.choices[key], num);
			 num++;
		}
	},

	add_choices_mc: function(key, choice, num) {		
		var graphics = game.add.graphics(0, 0);		

		var circleDiameter = 50;	
		var circleRadius = circleDiameter / 2;
		var answerDistance = circleDiameter + 10;
	    var circleX = questionPanel.x + 50;
	    var circleY = (questionPanel.y + questionPanel.height + 50) + (answerDistance * num);
	   		    
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

	checkAnswer: function (answer) {
		if (questionsJSON[questionIndex].answer == answer) {
			alert("Correct!");			
		}
		else {
			alert("Wrong!");
		}
		this.destroyGraphics(QAgroup);
	},

	destroyGraphics: function(group) {		
		group.destroy();	
	}
}; 