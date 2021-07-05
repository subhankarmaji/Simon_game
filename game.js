var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var buttonColor = ["red","blue","green","yellow"];
$(document).on("keydown",function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
 
});


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    // console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    // console.log(currentLevel);
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
    
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        var audio = new Audio ("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over , Press Any Key to Restart");
        startOver();
    }
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);

}


function playSound(name){
    var audio = new Audio ("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



