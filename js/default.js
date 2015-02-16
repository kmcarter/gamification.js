

var question = "";
var tCorrect = 0;
var tWrong = 0;
var wrongQ = [];
var rank = [
	"Deranged Debtor",
	"Wild Welsher",
	"Berserk Borrower",
	"Passionate Payer",
	"Calm Collector",
	"Sane Saver",
	"Excited Earner",
	"Frantic Financer",
	"Insane Investor",
	"Manic Money Master"
];
var rankPercent = Math.round(Math.random()*100)+"%";
var addBu = null;

function clearQ() {
    "use strict";
    // Start fresh
    $("#question").empty();
    $("#options").empty();
	$("#question").hide();
	$("#options").hide();
}

var gameElements = ["#tracking", "#question", "#options", "#qResult", "#gameOver"];

function showGame() {
    "use strict";
    for (var i = 0; i < gameElements.length; i++) {
		$(gameElements[i]).show();
	};
}

function hideGame() {
	"use strict";
    for (var i = 0; i < gameElements.length; i++) {
		$(gameElements[i]).hide();
	};
};

function resetGame() {
	"use strict";
    tCorrect = 0;
    tWrong = 0;
	wrongQ = [];
};

// Add Final buttons after score display, to prevent users from clicking too quickly
function addFinalBu() {
	"use strict";
	$("#results").append("<div class='buContainer'><div id='fb-root' class='buFacebook'><div class='buFacebook-icon-f'></div><div class='buFacebook-text'>Share your results!</div></div><a id='play-again' class='cta bu green' href='#' onclick='beginGame();return false;'>Play Again?</a></div>");
	fbPost();
	clearInterval(addBu);
}


function gameOver() {
    "use strict";
    hideGame();
    clearQ();

    $("#gameOver").show();

	if (tCorrect<=9){
		var r = tCorrect;
	} else {
		var r = 9;
	};

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","xml/quicktips.xml",false);
	xmlhttp.send();
	var xmlDoc = xmlhttp.responseXML;

	//alert(xmlDoc);
	// Obtain the category
	//var category = xmlDoc.getElementsByTagName("category")[0].childNodes[0].nodeValue;
	// Obtain the title
	//var title = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
	// Obtain the content
	//var content = xmlDoc.getElementsByTagName("content")[0].childNodes[0].nodeValue;
	//alert (category+title+content);
	
	//alert (this.data);
	
	if (tCorrect==0 && tWrong==0) {
		$("#gameOver").html("<div id='response' style='margin-top:1em;'>You didn't answer any questions.</div><a id='next-question' class='cta bu green' href='#' onclick='beginGame();return false;'>Start Game<br>(really, this time)</a>");
	} else {
		$("#gameOver").html("<div id='results' style='margin-top:1em;'><p>You got "+tCorrect+" right, earning the title:</p><h2 id='rankTitle'>"+rank[r]+"</h2><p>You placed in the top "+rankPercent+".</p></div>");
		addBu = setInterval(addFinalBu, 2000);
		var wrongLinks = "<ul id='wrongLinks'><p>Cheat by reviewing the RevolutionCredit Quicktips the questions - <i>you got wrong</i> - were based on:</p>";

	    for (var w = 0; w < wrongQ.length; w++){
			var quicktipID = wrongQ[w];
			var title = xmlDoc.getElementsByTagName("title")[(quicktipID-1)].childNodes[0].nodeValue;
			wrongLinks = wrongLinks + "<li><a href='http://www.revolutioncredit.com/quicktip.php?tipId="+quicktipID+"' target='_blank' class='bu blue'>"+title+"</a></li>";
	    }

		wrongLinks = wrongLinks+"</ul>";
		
		if (tWrong==0) {
			//
		} else {
			$("#gameOver").append(wrongLinks);
		};
	};	
};

function createTimer() {
    "use strict";
    var gameTime = 60;
    $("#timer").html(gameTime);
    var gameClock = setInterval(function () {
        gameTime = gameTime - 1;
        $("#timer").html(gameTime);
        if (gameTime <= 0) {
            clearInterval(gameClock);
            gameOver();
        }
    }, 1000);
};

var trivia = [
    {question:"Which comes first, when setting a financial goal?", options: ["Making a plan", "Chicken", "Egg"], answer: "Making a plan", tipID: "1"},
    {question:"What is the first, and most important, step toward a safe and secure financial future?", options: ["Stop spending", "Knowing how much you spend against how much you earn", "Kissing up to your rich relatives", "Buying a fancy car to make you look rich"], answer: "Knowing how much you spend against how much you earn", tipID: "2"},
    {question:"What is a realistic emergency you should save for?", options: ["They stop selling Cherry Garcia ice cream", "Zombies taking over", "Losing your job", "That red corvette finally getting to the dealership"], answer: "Losing your job", tipID: "3"},
    {question:"A credit report and credit score are the same thing.", options: ["True", "False", "What is credit?"], answer: "False", tipID: "4"},
    {question:"How many steps does the 4-step financial goal plan have?", options: ["1", "2", "3", "4"], answer: "4", tipID: "5"},
    {question:"What are the two types of expenses?", options: ["Apples and Oranges", "Fixed and Not Broken", "Fixed and Variable", "Avoidable and Just UGLY"], answer: "Fixed and Variable", tipID: "6"},
    {question:"At a minimum, how many months of living expenses should you have saved in your Emergency Fund?", options: ["6", "1", "12", "I will save when there is an emergency"], answer: "6", tipID: "7"},
    {question:"What range is an excellent credit score?", options: ["A-Z", "7-8", "Organic Free Range", "750-850"], answer: "750-850", tipID: "8"},
    {question:"What's the first step in setting a financial goal?", options: ["Avoid starting", "Defining a goal", "Realizing you have a goal problem", "Put one foot in front of the other"], answer: "Defining a goal", tipID: "9"},
    {question:"How long should you take to complete the '1-Week Budget Challenge'?", options: ["Let me Google that", "I will get to it later", "15 minutes, like getting insurance", "1 Week"], answer: "1 Week", tipID: "10"},
    {question:"Putting your emergencies on a credit card is really a very expensive loan", options: ["True", "False", "I do not care, it is my parents card"], answer: "True", tipID: "11"},
    {question:"How often can you get a free credit report from www.annualcreditreport.com?", options: ["Once a year, from each Bureau", "Weekly", "Every four years, like the Olympics", "As fast as I can click my mouse button"], answer: "Once a year, from each Bureau", tipID: "12"},
    {question:"How long is a long-term goal?", options: ["Getting through today", "3 Years", "Depends if I get probation", "86,400 seconds"], answer: "3 Years", tipID: "13"},
    {question:"This is a hard one, think about it carefully. The simple truth about budgeting is to spend less than you earn. Choose wisely.", options: ["True"], answer: "True", tipID: "14"},
    {question:"What's the minimum it takes to start an emergency fund?", options: ["$5", "$100", "That extra piece of gum", "Anything"], answer: "Anything", tipID: "15"},
    {question:"What should you do if you find a mistake on your credit report?", options: ["Nothing, it is too hard", "Work to resolve it", "Run around, screaming The sky is falling", "Prank call a bureau, pretending not to speak English"], answer: "Work to resolve it", tipID: "16"},
    {question:"Working backwards towards your goals means...", options: ["Set a timeframe and divide by how much you will need", "Turn around, face the other direction", "...snaem slaog ruoy sdrawot sdrawkcab gnikroW", "Try not having a goal"], answer: "Set a timeframe and divide by how much you will need", tipID: "17"},
    {question:"Of these choices, which is best for keeping track of what you spend?", options: ["My mind", "Smartphone App", "My significant other", "Napkins"], answer: "Smartphone App", tipID: "18"},
    {question:"Setting up regular, automatic transfers from your checking account to your emergency savings account can be with as little as $10 a week.", options: ["False", "False", "False", "True"], answer: "True", tipID: "19"},
    {question:"Inquiries and new applications for credit account for how much of your credit score?", options: ["100%", "10%", "100000%", "I hate math"], answer: "10%", tipID: "20"},
    {question:"Which reason is acceptable when giving up on your financial goals?", options: ["They ran out of chicken at the chicken place", "None, do NOT give up!", "It will land on leap year", "It is too hard"], answer: "None, do NOT give up!", tipID: "21"},
    {question:"What percentage of Americans don't have a budget?", options: ["Over 50%", "How much do those cost?", "Less than 1%"], answer: "Over 50%", tipID: "22"},
    {question:"Emergency funds aren't needed if you have a job.", options: ["True", "Who cares, I do not have emergencies", "False"], answer: "False", tipID: "23"},
    {question:"Missed payments could affect your credit score by", options: ["Hurting its feelings", "One full letter grade", "Up to 100 points"], answer: "Up to 100 points", tipID: "24"}
];

var correctResponses = ["Awesome!", "Nice job!", "Correctomundo!", "Doing the happy dance!", "Score!", "Fantastic!", "Keep up the momentum!", "You're Amazing", "Your brain is HUGE!", "You Rock!", "We have a genius here!", "Digital applause happening!", "Is there anything you get wrong?", "You're on fire!"];

var wrongResponses = ["Ohh, so close but so far.", "Uhhh, no.", "Not even close.", "Try again, but be smarter.", "You aren't really trying are you?", "A dart thrown from space could get closer.", "If you were trying NOT to get it right, you succeeded.", "Well, you just wasted some time.", "No, no, no, no, NO!", "We computers call that Artificial NON-Intelligence.", "Totally right! Just kidding, not even close.", "Zzzzzz"];


function updateTally() {
    "use strict";
    $("#tally-correct").html("<span class='tally-label'>Right:</span> "+tCorrect);
    $("#tally-wrong").html("<span class='tally-label'>Wrong:</span> "+tWrong);
};

function checkAnswer(c, o) {
    "use strict";
    clearQ();
    if (c==o) {
        var c = Math.floor(Math.random()*correctResponses.length);
        $("#qResult").prepend("<div id='response'>"+correctResponses[c]+"</div>");
        ++tCorrect;
    } else {
        var w = Math.floor(Math.random()*wrongResponses.length);
        $("#qResult").prepend("<div id='response'>"+wrongResponses[w]+"</div>");
        wrongQ.push(question);
        ++tWrong;
    }
    //used.push(question);
    $("#qResult").append("<a id='next-question' class='cta bu green' href='#' onclick='freshQ();return false;'>Next Question</a>");
    updateTally();
};

function freshQ() {
    "use strict";
    // Generate random number to select the question   
    var q = Math.floor(Math.random()*trivia.length);
    createQ(q);
};
var used = [];
function createQ(q) {
    "use strict";
    //Check to see if the response has already been used.
	if (jQuery.inArray( q, used )!=-1){
		if(used.length==trivia.length){
               used.length = 0;
			freshQ();
		} else {
			freshQ();
           }
	} else {
        used.push(q);
		$("#qResult").empty();    
        // Hold the correct answer
        var c = '"'+trivia[q].answer+'"';
        question = trivia[q].tipID;
        // Display the question
        $("#question").html(trivia[q].question);
        // Display the options
        for (var i = 0; i < trivia[q].options.length; i++){
            var o = '"'+trivia[q].options[i]+'"';
			var oBare = trivia[q].options[i];
			$("#question").show();
			$("#options").show();
			$("#options").append("<li><a href='#' onclick='checkAnswer("+c+", "+o+");return false;' class='bu blue'>"+oBare+"</a></li>");
        };
	};
};

function beginGame() {
    "use strict";
    $(".title-screen").hide();
	$("#header").show();
    $("#gameOver").empty();
    resetGame();
    showGame();
    createTimer();
    freshQ();
    updateTally();
	setMargin();
};

$('#start-game').click(function() {
    beginGame();
});

hideGame();



// Post to Facebook

function fbPost (){
	window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '107617865941350',
	      xfbml      : false,
	      version    : 'v2.1'
	    });
	  };

	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));

	$('#fb-root').click(function() {
		FB.ui({
	    	display: 'popup',
	    	method: 'share',
	    	href: 'http://www.edazzle.com/mm',
			caption: 'Manic Money Trivia Game',
		},
		function(response) {
		    if (response && !response.error_code) {
		      //alert('Posting completed.');
		    } else {
		      //alert('Error while posting.');
		    }
		});
	});
};




$( window ).resize(function() {
	setMargin();
});

function setMargin(){
  	
	// Initial Width
	var wW = $(".w").width();
	var tW = $("#timer").outerWidth();
	var lW = (wW-tW)/2;

	$("#timer").css("left", lW);

}









