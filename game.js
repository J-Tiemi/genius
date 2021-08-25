var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;

$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

document.addEventListener("keypress", function (event) {
  var color;
  if (event.key === "q") {
    color = "green";
    userClickedPattern.push(color);
    playSound(color);
    animatePress(color);
    checkAnswer(color.length - 1);
  }
  if (event.key === "w") {
    color = "red";
    userClickedPattern.push(color);
    playSound(color);
    animatePress(color);
    checkAnswer(color.length - 1);
  }
  if (event.key === "a") {
    color = "yellow";
    userClickedPattern.push(color);
    playSound(color);
    animatePress(color);
    checkAnswer(color.length - 1);
  }
  if (event.key === "s") {
    color = "blue";
    userClickedPattern.push(color);
    playSound(color);
    animatePress(color);
    checkAnswer(color.length - 1);
  }
});

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, press any key to restart");
    $("body").css("background", "repeating-linear-gradient( -45deg, #5f130e 0px, #5f130e 5px, #6d1513 6px, #6d1513 11px, #5f130e 12px)");

    setTimeout(function () {
      $("body").removeClass("game-over");
      $("body").css("background", "repeating-linear-gradient( -45deg, #011F3F 0px, #011F3F 5px, #012d44 6px, #012d44 11px, #011F3F 12px)");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var activeButton = document.querySelector("." + currentColour);
  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}