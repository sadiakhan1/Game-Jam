// Move the catcher with the left and right arrow keys to catch the falling objects.

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let catcherImage;



/* PRELOAD LOADS FILES */
function preload() {
  catcherImage = loadImage('assets/catcher.png'); 
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);

  // Create catcher 
  catcher = new Sprite(200, 290, 100, 20, "k");
  catcher.addImage(catcherImage);

  // Create falling object
  fallingObject = new Sprite(100, 0, 10);
  fallingObject.color = color("darkgreen");
  fallingObject.vel.y = 4;
}

/* DRAW LOOP REPEATS */
function draw() {
  background(224, 224, 224);

  // If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(3, 5);
  }
  // Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -5; // Move catcher to the left
  } else if (kb.pressing("right")) {
    catcher.vel.x = 5; // Move catcher to the right
  } else {
    catcher.vel.x = 0; // Stop catcher movement
  }

  // Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > 350) {
    catcher.x = 350;
  }
  // If fallingObject collides with catcher, move back to random position at top
  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(width);
    fallingObject.vel.y = random(1, 5);
    fallingObject.direction = "down";
    score = score + 1;
  }
  if (score >= 5) {
    if (kb.pressing("left")) {
      catcher.vel.x = 5; // Move catcher to the left
    } else if (kb.pressing("right")) {
      catcher.vel.x = -5; // Move catcher to the right
    } else {
      catcher.vel.x = 0; // Stop catcher movement
    }
  }
  if (score >= 5) {
    fallingObject.vel.y = random(5, 7);
  }

//ground
  //grass
  noStroke();
  fill('#355E3B');
rectMode(CENTER);
rect(200, 340, 400, 15);
  //dirt
  fill('#6F4E37');
rect(200, 400, 600, 113);
  //sky
  fill("#ADD8E6");
  rect(200, 0, 400, 665);

  // Draw directions to screen
  fill("white");
  textSize(12);
  text("Move the \ncatcher with the \nleft and right \narrow keys to \ncatch hope.\nAfter you catch\nfive, the difficulty\nincreases", width - 100, 20);

  // Draw the score to screen
  fill("white");
  textSize(15);
  text("Hope Count: " + score, 136, 390);
}