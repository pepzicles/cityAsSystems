let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V;
let carX,carY, carV, dasTime, startX, sandbox;
let bg, music;


//facial expression images
let expressions = []

//to change background images
let backgroundImages = [];
let bikelaneImages = [];
let carImages = [];
let sceneCount = 0;


//collision car
let collisionCarX = 10; // Initial X position of the collision car
let collisionCarSpeed = 0; // Initial speed of the collision car
let collisionCarAcceleration = 0.8; // Acceleration rate for the collision car
let collisionDistanceToAccelerate = 650; // Distance to accelerate the collision car before showing the explosion
let showCollisionExplosion = false;
let collisionOccurred = false;
let collisionScene = false;



function preload() {
  biker = loadImage('images/biker.png');
  road = loadImage('images/road2.jpeg')
  pavement = loadImage('images/pavement.jpeg')
  streetsign = loadImage('images/streetsign.png')
  relieved = loadImage('images/relieved.png')
  hurry = loadImage('images/hurry.png')
  logo = loadImage('images/logo.png')
}


function setup() {
  // Load your background images into the array.
  backgroundImages[0] = loadImage('images/bg_rain.gif');
  backgroundImages[1] = loadImage('images/bg_sunny.jpeg');
  backgroundImages[2] = loadImage('images/bg_sunny.jpeg');
  backgroundImages[3] = loadImage('images/bg_snow.gif');
  backgroundImages[4] = loadImage('images/bg_snow.gif');
  
  
  //Bikelane images
  bikelaneImages[0] = loadImage('images/nobikelane.jpeg');
  bikelaneImages[1] = loadImage('images/nobikelane.jpeg');
  bikelaneImages[2] = loadImage('images/bikelane2.png');
  bikelaneImages[3] = loadImage('images/nobikelane.jpeg');
  bikelaneImages[4] = loadImage('images/bikelane2.png');


  //load car images
  carImages[0] = loadImage('images/cars/car1.png');
  carImages[1] = loadImage('images/cars/car2.png');
  carImages[2] = loadImage('images/cars/car3.png');
  carImages[3] = loadImage('images/cars/car4.png');
  carImages[4] = loadImage('images/cars/car5.png');
  collisionCar = loadImage('images/cars/car2.png');


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
  image(road, 0, -90, width, 150)

  //Bikelanes
  // Update the bikelane image based on the sceneCount
    if (sceneCount < bikelaneImages.length) {
      image(bikelaneImages[sceneCount], 650, 0, 150, height);
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
  //rect(0, 0, width, 50);
  strokeWeight(2);
  stroke(1);
  displayLocation();
  displayScores();
  bikerInLane();
  
  

  //Only trigger collision in scenes 0, 3, 4
  if (sceneCount == 0 || sceneCount == 3 || sceneCount == 4) {
    collision();
  }

  //relieved face in scene 1
  if (sceneCount == 1){
    relievedFace();
  }

  if (sceneCount == 2){
    hurryFace();
  }


  //LOGO!
  fill(220);
  circle(40, 650, 60);
  image(logo, 15, 625, 50, 50)
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
  fill(255);

  noStroke();
  text("GAME OVER", 64,300);
  textSize(20);
  text("Click to restart.", 64,340);  
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
  noStroke();
  fill(255, 255, 255, 150)
  //rect(30, 30, 150, 200, 5)


  textSize(14);
  strokeWeight(0);
// Display Lives
  fill(255);
  textStyle(BOLD)
  text('Lives:', 43, 92);
  fill(255);
  for(let i=0;i<3;i++){
    ellipse(17*i+100, 86, 10);
  }
  
  fill(255,80,70);
  textStyle(BOLD);
  textSize(16);

  for(let i=3;i>lives;i--){
    text('X',17*i+78, 80, 10);
  }
  textStyle(BOLD);
  textSize(14);
  // Display Score
  fill(255);
  text(`Score: ${score}`, 43, 132);
  
  // Display game over message if the game is over
  textSize(12);
  fill(200);
  text("Press space to restart.", 30, 168);
  //text("Press 'm' to toggle music.", width-200,35);
}


function displayLocation() {

  image(streetsign, 30, 20, 265, 35);
  image(streetsign, 30, 70, 140, 35);
  image(streetsign, 30, 110, 140, 35);

  textStyle(BOLD);
  textSize(15);
  //text('Location:', 170, 30)
  //text('Weather:', 550, 30)
  //text('Bike Lane:', 800, 30)

  textStyle(BOLD);
  fill(255);
  text(bikerDetails.location[sceneCount], 43, 42)
  fill(0);
  textStyle(NORMAL);
  //text(bikerDetails.weather[sceneCount], 615, 30)
  //text(bikerDetails.bikelane[sceneCount], 875, 30)
}


function bikerInLane() {
  if (frogY < 562 && frogX > 800) {
    fill(255, 255, 255, 150)
    rect(frogX + 50, frogY-30, 170, 40, 10)
    fill(0);
    textSize(14);
    text("❗Out of bike lane❗", frogX + 65, frogY - 5);
  }

  if (frogY < 562 && frogX < 640) {
    fill(255, 255, 255, 150)
    rect(frogX - 220, frogY-30, 170, 40, 10)
    fill(0);
    textSize(14);
    text("❗Out of bike lane❗", frogX -208, frogY - 5);
  }

}


function collision() {
  if (frogY < 300) {
    if (collisionCarX < collisionDistanceToAccelerate) {
    // Accelerate the collision car
    collisionCarSpeed += collisionCarAcceleration;
    collisionCarX += collisionCarSpeed;
    } else if (!collisionOccurred) {
      // Set the flag to indicate a collision has occurred
      collisionOccurred = true;
      showCollisionExplosion = true;
      //lives -= 1; // Deduct a life
    }

    // Draw the collision car
    image(collisionCar, collisionCarX, 200, 70, 40);

    // Show the explosion emoji
    if (showCollisionExplosion) {
      textSize(70);
      text("💥", collisionCarX + 40, 200, 100, 100)
      
      //Explain the collision
      fill(255, 255, 255, 200);
      rect(450, 200, 170, 155, 5);
      textSize(14);
      fill(0);
      text("Cyclists injured:", 460, 223);
      text("Cyclists killed:", 460, 240);
      text("Motorists injured:", 460, 257);
      text("Motorists killed:", 460, 274);
      textStyle(NORMAL);
      text(bikerDetails.cylistsInjured[sceneCount], 590, 223);
      text(bikerDetails.cyclistsKilled[sceneCount], 590, 240);
      text(bikerDetails.motoristsInjured[sceneCount], 590, 257);
      text(bikerDetails.motoristsKilled[sceneCount], 590, 274);
      textSize(12);
      text("Source: NYC Crash Mapper", 460, 305);
      textStyle(BOLD);
      text("Resume game as normal!", 460, 340)
    } 
  }
}


function relievedFace() {
  fill(255, 255, 255, 200);
  rect(1175, 530, 220, 125, 5);
  image(relieved, 1175, 530, 120, 120);
  fill(0);
  textSize(13);
  text("Biker is feeling:", 1285, 560);
  textStyle(NORMAL);
  textSize(15);
  text("Relieved", 1285, 590)
}

function hurryFace() {
  fill(255, 255, 255, 200);
  rect(1175, 530, 220, 125, 5);
  image(hurry, 1175, 530, 100, 130);
  fill(0);
  textSize(13);
  text("Biker is feeling:", 1285, 560);
  textStyle(NORMAL);
  textSize(15);
  text("In a hurry!", 1285, 590)
}