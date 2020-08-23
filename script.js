let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let gameStarted = false;

let level = 0;


// Detect a keypress to start the game
$(document).keypress(function() {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Detect when buttons are clicked
$(".btn").click(function() {
  // Store the id of the button clicked as userChosenColor
  let userChosenColor = $(this).attr("id");
  // Add userChosenColor to the userClickedPattern array
  userClickedPattern.push(userChosenColor);
  // Play the sound for the button clicked
  playSound(userChosenColor);
  // Animate press
  animatePress(userChosenColor);
  // Check user answer
  checkAnswer(userClickedPattern.length - 1);
});


// Check if the most recent user answer is the same as the gamePattern
function checkAnswer(currentLevel) {
  // If user answer is correct, log "success"
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    // Check if user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequence() after a 1000 millisecond delay
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    // If user answer is incorrect, log "wrong"
  } else {
    console.log("wrong");
    // Play sound for wrong
    playSound("wrong");
    // Apply .game-over to the body then remove after 200 ms
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    // Change the h1 title if the user gets an answer wrong
    $("#level-title").text("Game Over! Press Any Key to Restart");
    // Call startOver to restart the game
    startOver();
  }
}


function nextSequence() {
  // Once nextSequence is triggered, reset userClickedPattern to an empty array, ready for the next level
  userClickedPattern = [];
  // Increase level by 1 every time nextSequence is called
  level++;
  // Update the h1 with the change in level
  $("#level-title").text("Level " + level);
  // Generate a random number from 0 to 3 (inclusive)
  let randomNumber = Math.floor(Math.random() * 3);
  // Create a new variable called randomColorChosen and use randomNumber to chose a color from the buttonColors array
  let randomColorChosen = buttonColors[randomNumber];
  // Add randomColorChosen to end of gamePattern array
  gamePattern.push(randomColorChosen);
  // Make the chosen button flash
  $("#" + randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play the sound for the button selected
  playSound(randomColorChosen);
}


// Reset the values to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}


// Plays the sound associated with the button name
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Buttons flash when pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
