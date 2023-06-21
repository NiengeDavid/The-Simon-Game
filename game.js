//Random Colour Array
const buttonColours = ["red", "blue", "green", "yellow"];

//Game patterns
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Start trigger
$("*").keypress(function() {
    if(!started) {
        nextSequence();
        // Changing Title content
        $("#level-title").text("Level:" + " " + level);
        started = true;
    };
});

//Click Actions
$(".btn").on( "click", function() {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    animatePress(this.id);
    playSound(this.id);
    
    checkAnswer(userClickedPattern.length-1);
} );

// Check Answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        // User got it right
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        };
    }else {
        // User got it wrong
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    };
}

//Restart Game if user fails a round
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {
    //Resetting userClickedPatterns
    userClickedPattern = [];
    // Changing levels
    level ++;
    //update the titles level indicator
    $("#level-title").text("Level:" + " " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
    animatePress(randomChosenColour);
};

// play sounds on click
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Button Animation
function animatePress(currrentColour) {
    $("#" + currrentColour ).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currrentColour ).removeClass("pressed");
    }, 100);
}




