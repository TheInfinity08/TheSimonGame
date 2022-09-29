var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var sound;
var buttonColours = ["red", "blue", "green", "yellow"];
var musicArr = [
  "./sounds/red.mp3",
  "./sounds/blue.mp3",
  "./sounds/green.mp3",
  "./sounds/yellow.mp3",
  "./sounds/wrong.mp3",
];

function playSound(name) {
  sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  setInterval(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 150);
  $("#" + currentColor).addClass("pressed");
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // console.log(gamePattern);
  // console.log(userClickedPattern);
  if ((userClickedPattern.length >= gamePattern.length) && (userClickedPattern[userClickedPattern.length-1] != gamePattern[gamePattern.length-1])) {
      sound = new Audio("./sounds/wrong.mp3");
      sound.play();
      $("body").addClass("game-over");
      setInterval(() => {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
  }

  if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
});

// console.log(buttonColours);
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);
  sound = new Audio(musicArr[randomNumber]);
  sound.play();
  $("h1").text("Level " + level);
  level++;
}

// $(document).keypress(function () {
//   level = 0;
//   gamePattern = [];
//   userClickedPattern = [];
//   nextSequence();
// });

$("#restart").click(function () {
  setInterval(() => {
    $(this).removeClass("pressed");
  }, 150);
  $(this).addClass("pressed");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  nextSequence();
});
