				
var worldState = {
	create: function () {					
		questionPanel = {       
		    x: (game.world.width*0.5) - 125,
		    y: (game.world.height*0.5) - 140,
		    width: 250,
		    height: 200,
		    borderwidth: 8,         
		    radius: 20,
		};

		this.add_question_mc();		
	},	

	update: function() {
		
	},	

	restart: function () {		
		getHighscores = false;
		game.state.start('gameover');
	},

	add_question_mc () {	
		background = game.add.sprite(0, 0, "bgmc1");
		background.width = 	game.width;
		background.height = game.height;

		var graphics = game.add.graphics(0, 0);

		graphics.beginFill(color1, 1);
		graphics.drawRect(0, 0, game.width, 50);

		graphics.lineStyle(questionPanel.borderwidth, color1);
	    graphics.beginFill(color2, 1);
	    graphics.drawRoundedRect(
	    	questionPanel.x, 
	    	questionPanel.y, 
	    	questionPanel.width, 
	    	questionPanel.height,	    	
	    	questionPanel.radius
	    );
	    graphics.endFill();		

	    var question = "What does an Avocado have that is poisonous to your dog?";		
	    var questionText = game.add.text(0, 0, question,
	    	{ font:'18px Arial', fill:'#fff', boundsAlignH:'center', boundsAlignV:'middle',
	    	align:'center', wordWrap:true, wordWrapWidth: questionPanel.width-40 });
	    questionText.setTextBounds(questionPanel.x+10, questionPanel.y, questionPanel.width-10, questionPanel.height-10);	    


		var answers = {A: "Persin", B: "Parsin", C:"Parsen"};
		var num = 0;

		for (var key in answers) {		
			 this.add_answer_mc(key, answers[key], num);
			 num++;
		}
	},

	add_answer_mc (key, answer, num) {	
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
	    
	    var answerText = game.add.text(0, 0, answer,
	    	{ font:'21px Arial', fill:'#fff', boundsAlignV:'middle' });
	    answerText.setTextBounds(rectX+circleDiameter+5, rectY+2, rectWidth, rectHeight);

	    graphics.lineStyle(3, color1);
	    graphics.beginFill(color2, 1);
	    graphics.drawCircle(circleX, circleY, circleDiameter);
	    graphics.endFill();
	    
	    var keyText = game.add.text(0, 0, key,
	    	{ font:'26px Arial', fontWeight:'bolder', fill:"#fff", boundsAlignH:'center', boundsAlignV:'middle', align:'center' });
	    keyText.setTextBounds(circleX-circleRadius, circleY-circleRadius+2, circleDiameter, circleDiameter);			    
	}	
}; 