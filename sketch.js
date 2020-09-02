var playPaddle;
var compPaddle;
var ball;
var pScore, cScore;
var SERVE, PLAY, END, gameState;

function setup() {
  createCanvas(400, 400);
  playPaddle = createSprite(390, 200, 10, 100);
  ball = createSprite(200, 200, 10, 10);
  compPaddle = createSprite(10, 200, 10, 100);
  pScore = 0;
  cScore = 0;
  SERVE = 0;
  PLAY = 1;
  END = 2;
  gameState = "SERVE";
}

function draw() {
  background("white");
  if (gameState === "SERVE") {
    text("Press Space to Serve", 140, 180);
  }
  text(pScore, 225, 20);
  text(cScore, 175, 20);
  for (var num = 0; num < 400; num=num+20) {
    line(200, num, 200, num+10);
  }
  compPaddle.y=ball.y;
  playPaddle.y=mouseY;
  if (keyDown("space") && gameState === "SERVE") {
    ball.velocityX=2.5;
    ball.velocityY=-5;
    gameState = "PLAY";
  }
  
  edges = createEdgeSprites();
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(compPaddle);
  ball.bounceOff(playPaddle);
  if (ball.x>400||ball.x<0) {
    if (ball.x>400) {
      cScore++;
    }
    if (ball.x<0) {
      pScore++;
    }
    ball.x=200;
    ball.y=200;
    ball.velocityX=0;
    ball.velocityY=0;
    gameState = "SERVE";
  }
  if (cScore === 2||pScore === 2) {
   gameState = "END"; 
   text("Game Over", 165, 160);
   text("Press 'R' to RESTART", 145, 180);
  }
  if (keyDown("R") && gameState === "END") {
    gameState = "SERVE";
    cScore = 0;
    pScore = 0;  
  }
  drawSprites();
}