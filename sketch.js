let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V;
let carX,carY, carV, dasTime, startX, sandbox;
let bg, music;


//to change background images
let backgroundImages = [];
let bikelaneImages = [];
let carImages = [];
let sceneCount = 0;


function preload() {
  biker = loadImage('images/biker.png');
  road = loadImage('images/road2.jpeg')
  pavement = loadImage('images/pavement.jpeg')
  streetsign = loadImage('images/streetsign.png')
}


function setup() {
  // Load your background images into the array.
  backgroundImages[0] = loadImage('images/bg_rain.gif');
  backgroundImages[1] = loadImage('images/bg_sunny.jpeg');
  backgroundImages[2] = loadImage('images/bg_sunny.jpeg');
  //backgroundImages[3] = loadImage('images/bg_snow.gif');
  
  
  //Bikelane images
  bikelaneImages[0] = loadImage('images/nobikelane.jpeg');
  bikelaneImages[1] = loadImage('images/nobikelane.jpeg');
  bikelaneImages[2] = loadImage('images/bikelane2.png');


  //load car images
  carImages[0] = loadImage('images/cars/car1.png');
  carImages[1] = loadImage('images/cars/car2.png');
  carImages[2] = loadImage('images/cars/car3.png');
  carImages[3] = loadImage('images/cars/car4.png');
  carImages[4] = loadImage('images/cars/car5.png');


  // Canvas & color settings
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(0);
  //bg=loadImage("road.jpg");
  frogX = width/2;//random(width);
  frogY = height-50;//random(height);
  score = 0;
  lives = 3;
  gameIsOver = false;
  sandbox=false;
  /*car1X = -30;
  car1Y = 100;
  car1V = 5;*/
  startX=[-30,width+30];
  carX=[-30];
  carY=[100];
  carV = [5];
  dasTime = 0;
}

function draw() {
  // Load initial background image.
  clear();

  //Roads for cars
  image(road, 0, 430, width, 150)
  image(road, 0, 300, width, 150)
  image(road, 0, 170, width, 150)
  image(road, 0, 40, width, 150)

  //Bikelanes
  // Update the bikelane image based on the sceneCount
    if (sceneCount < bikelaneImages.length) {
      image(bikelaneImages[sceneCount], 650, 50, 150, height);
    }

  //initial pavement
  fill(215, 215, 215)
  rect(0, 580, width, 130)
  image(pavement, 0, 580, 600, 200)
  image(pavement, 600, 580, 600, 200)
  image(pavement, 1200, 580, 600, 200)

  moveCars();
  drawCars();
  das();
  if (score>=6&&!sandbox){
    win();
    gameIsOver=true;
  }else if (!gameIsOver){
    checkCollisions();
    checkWin();
  }else{
    gameOver();
  }

  //Display cyclist
  fill(120, 80, 80);
  image(biker, frogX-25, frogY-60, 50, 130)
  
  background(backgroundImages[sceneCount], 0, 0, width, height);

  //Top header
  strokeWeight(2);
  fill(255, 150, 150);
  rect(0, 0, width, 50);
  strokeWeight(2);
  stroke(1);
  displayScores();
  displayLocation();
}

// Key Codes - UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
function keyPressed() {
  if(!gameIsOver){
    if (keyCode === UP_ARROW) {
      frogY -= 7;
    }else if(keyCode==DOWN_ARROW&&frogY+10<=height){
      frogY+=7;
    }else if(keyCode==RIGHT_ARROW&&frogX+10<=width){
      frogX+=7;
    }else if(keyCode==LEFT_ARROW&&frogX-10>=0){
      frogX-=7;
    }
    if (keyCode === 87) {
      frogY -=7;
    }else if(keyCode==83&&frogY+10<=height){
      frogY+=7;
    }else if(keyCode==68&&frogX+10<=width){
      frogX+=7;
    }else if(keyCode==65&&frogX-10>=0){
      frogX-=7;
    }else if (keyCode==77){
      if(music.isPlaying()){
        music.pause();
      }else{
        music.loop();
      }
    }else if(key==' '){
      console.log('space pressed');
      setup();
      //redraw();
    }
  }
}

function das(){
  if(!gameIsOver){
    if(keyIsDown(UP_ARROW)&&dasTime>7) {
      frogY -= 20;
      dasTime=0;
    }else if(keyIsDown(DOWN_ARROW)&&dasTime>7&&frogY+10<=height){
      frogY+=20;
      dasTime=0;
    }else if(keyIsDown(RIGHT_ARROW)&&dasTime>7&&frogX+10<=width){
      frogX+=20;
      dasTime=0;
    }else if(keyIsDown(LEFT_ARROW)&&dasTime>7&&frogX-10>=0){
      frogX-=20;      
      dasTime=0;
    }
    if(keyIsDown(87)&&dasTime>7) {
      frogY -= 10;
      dasTime=0;
    }else if(keyIsDown(83)&&dasTime>7&&frogY+10<=height){
      frogY+=10;
      dasTime=0;
    }else if(keyIsDown(68)&&dasTime>7&&frogX+10<=width){
      frogX+=10;
      dasTime=0;
    }else if(keyIsDown(65)&&dasTime>7&&frogX-10>=0){
      frogX-=10;      
      dasTime=0;
    }
  }
  dasTime++;
}

function moveCars() {
  // Move the car
  for (i =0;i<carX.length;i++){
    carX[i]+=carV[i];
    if(carX[i]>width&&carV[i]>0){
      carX[i]=-30;
      carY[i]=random(height/2, height-200);
    }else if(carX[i]<-30&&carV[i]<0){
      carX[i]=width+30;
      carY[i]=random(50, height/2);
    }
  }
  /*
  car1X += car1V;
  // Reset if it moves off screen
  if(car1X>width){
    car1X=-30;
    car1Y=random(50,height-100);
  }
  */
}

function drawCars() {
  // Code for car 1
  //rect(car1X, car1Y, 40, 30);
  // Code for additional cars
  push();
  for (i = 0; i < carX.length; i++) {
    //let randomCarImage = random(carImages); // Select a random car image
    image(carImages[4], carX[i], carY[i], 70, 40);
  }
  pop();
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  hit=false;
  for (i =0;i<carX.length;i++){
    if(collideRectCircle(carX[i],carY[i],70,40,frogX,frogY,50)){
      hit=true;
    }
  }
  if (hit){
    lives--;
    frogY=height-50;
    if (lives<=0){
      gameIsOver=true;
    }
  }
}

function mousePressed(){
  if (gameIsOver&&score>=6&&lives>0){
    gameIsOver=false;
    sandbox=true;
  }else if (gameIsOver){
    setup();
  }
}

function gameOver(){
  textSize(60);
  fill(0,80,90);
  noStroke();
  text("GAME OVER", 64,280);
  textSize(20);
  text("Click to restart.", 180,320);  
}

function win(){
  textSize(60);
  noStroke();
  fill(120,80,90);
  text("YOU WIN!!!", 100,280);
  textSize(20);
  text('Click to continue in sandbox mode.', 100, 300);
}

function checkWin() {
    // If the frog makes it into the yellow gold zone, increment the score
    // and move the frog back down to the bottom and change background scene

  if(frogY<=50){
    score++;
    frogY=height-50;
    frogX = width / 2;
      
    // Change the background image
    //currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
    background(backgroundImages[sceneCount]);


    let isMovingLeft=round(random(1));
    
    carX.push(startX[isMovingLeft]);
    newV=random(3,5+score)
    if(isMovingLeft==1){
      carY.push(random(50,height/2));
      newV*=-1;
    }else{
      carY.push(random(height/2,height-100));
    }
    carV.push(newV);
    //console.log(isMovingLeft);


    //Iterate the sceneCount
    sceneCount += 1;
  }
  
  //carV.push(5);
}



function displayScores() {
  textSize(12);
  strokeWeight(0);
// Display Lives
  fill(0);
  text('Lives:', 10, 20);
  fill(120, 80, 80);
  for(let i=0;i<3;i++){
    ellipse(13*i+50, 15, 8);
  }
  
  fill(0,80,70);
  textStyle(BOLD);
  textSize(16);

  for(let i=3;i>lives;i--){
    text('X',13*i+31.5, 21);
  }
  textStyle(NORMAL);

  // Display Score
  fill(0);
  text(`Score: ${score}`, 10, 30);
  
  // Display game over message if the game is over
  textSize(12);
  text("Press space to restart.", width-200, 30);
  //text("Press 'm' to toggle music.", width-200,35);
}


function displayLocation() {

  image(streetsign, 240, 7, 265, 35);

  textStyle(BOLD);
  textSize(14);
  text('Location:', 170, 30)
  text('Weather:', 550, 30)
  text('Bike Lane:', 800, 30)

  textStyle(BOLD);
  fill(255);
  text(bikerDetails.location[sceneCount], 255, 30)
  fill(0);
  textStyle(NORMAL);
  text(bikerDetails.weather[sceneCount], 615, 30)
  text(bikerDetails.bikelane[sceneCount], 875, 30)

  //console.log(bikerDetails.location[sceneCount])
  console.log(height)
}


