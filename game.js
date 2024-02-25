var userClickedPattern=[]
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
function playSound(name){
var audioChosenColour= new Audio("sounds/"+name+".mp3");
audioChosenColour.play();
}

function nextSequence(){
level++;
$("#level-title").text("Level "+level);
userClickedPattern=[]//deleting the previus choies
var randomNumber=Math.floor(((Math.random()*4)));
var randomChosenColour =buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
if(level!=1){
    showSequence()
}
else{
$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
animatePress(randomChosenColour);
}
}

function showSequence() {
    var index = 0;
    function displayNextButton() {
        if (index < gamePattern.length) {
            var nextOne = gamePattern[index];
            $("#"+nextOne).fadeOut(250).fadeIn(250, function() {
                playSound(nextOne);
                animatePress(nextOne);
                index++;
                displayNextButton();
            });
        }
    }
    displayNextButton();
}

$(".btn").click(function(){
var userChosenColour=$(this).attr('id');
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length);
console.log(userClickedPattern);
});

function playSound(name){
var audioChosenColour= new Audio("sounds/"+name+".mp3");
audioChosenColour.play();
}

function animatePress(currentColour){
 $("#"+currentColour).addClass("pressed")    
 setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
 },100);
}

var flag=true;
$(document).keypress(function(){
    if(flag){
        flag=false
    $("#level-title").text("Level "+level);
    nextSequence();
    }
})

function checkAnswer(currentLevel){
    
if(gamePattern[currentLevel-1]==userClickedPattern[currentLevel-1]){
    if(currentLevel==gamePattern.length){
        setTimeout(function() { nextSequence(); }, 1000);
    }
}
else{
    if(level){
    var aduio=new Audio("sounds/oops.mp3");
    aduio.play();
    $("#level-title").text("Oops, I did it again! 🙈");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
     },1000);
     startOver();
}
}
function startOver(){
    level=0;
    gamePattern=[]
    userClickedPattern=[]
    setTimeout(function(){
        $("#level-title").text("Game Over, Press Any Key to Restart"); 
     },3000);
    
}
}
