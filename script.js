var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

// Defining var for Paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX =  (canvas.width-paddleWidth) / 2 ;
var paddleY = canvas.height-paddleHeight;

// Defining var for bricks
var brickRowCount = 12;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// Allowing the user to control the paddle
var rightPressed = false;
var leftPressed = false;

// Defining to store score
var score = 0;

// Declaring no of lives
let live = prompt('How many lives you need?');
console.log(live)
if (live== '' ){
  live = 1
}
if (live<=0){
  alert('Invalid Lives entered, Reload the page to enter again or play with 1 Lives')
  live = 1
}
var lives = live;

// Initialize bricks and status property
var bricks = [];
for (var c = 0 ; c < brickColumnCount; c++){
  bricks[c] = [];
  for (var r = 0 ; r < brickRowCount; r++){
    bricks[c][r] = { x: 0, y: 0, status: 1};
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e){
  if(e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = true;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft"){
    leftPressed = true;
  }
}

function keyUpHandler(e){
  if(e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = false;
  }
  else if (e.key == "Left" || e.key == "ArrowLeft"){
    leftPressed = false;
  }
}

function mouseMoveHandler(e){
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width){
    paddleX = relativeX - paddleWidth/2;
  }
}

// Function to detect collision with brick
function collisionDetection(){
  for (var c=0; c<brickColumnCount; c++){
    for (var r=0; r<brickRowCount; r++){
      var b = bricks[c][r];
      if(b.status == 1){
        if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
          dy = -dy;
          b.status = 0;
          score++ ;
          if ( score == brickRowCount*brickColumnCount){
            alert("You Won, Congratulations!");
            document.location.reload();
          }
        }
      }
    }
  }
}

// function to make a simple non-moving ball
function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

// function to draw paddle
function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Creating bricks
function drawBricks(){
  for (var c=0; c<brickColumnCount; c++){
    for (var r=0; r<brickRowCount; r++){
      if(bricks[c][r].status == 1){
        var brickX = (r*(brickWidth+brickPadding)) + brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// function to display score
function drawScore(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLives(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


// function to clear the canvas and move the ball
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
    dx = -dx;
  }
  if (y + dy < ballRadius){
    dy = -dy;
  }
  else if (y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
    }
    else {
      lives-- ;
      if(!lives){
        alert("GAME OVER!");
        // to reload the page again use
        document.location.reload();
        }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2 ;
      }
    }
  }
  if(rightPressed && paddleX < canvas.width - paddleWidth ){
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0){
    paddleX -= 7;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}


// Repeat the draw function in every 10milliseconds
draw();



// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();
//
//
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();
//
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();

// stroke only fill outer boundaries
