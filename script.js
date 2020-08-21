let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];



// Detect when buttons are clicked
$(".btn").click(function() {
  // Store the id of the button clicked as userChosenColor
  let userChosenColor = $(this).attr("id");
  // Add userChosenColor to the userClickedPattern array
  userClickedPattern.push(userChosenColor);
  // Play the sound for the button clicked
  playSound(userChosenColor);
});


function nextSequence() {
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

// Plays the sound associated with the button name
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
