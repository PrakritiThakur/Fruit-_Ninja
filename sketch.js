//declaring variables
var knife, knifeImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var Score = 0;
var fruit1, fruit2, fruit3, fruit4;
var scuttingSound, endSound;

function preload() {

  //loading animation for knife
  knifeImage = loadAnimation("sword.png");

  //loading image for fruits
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png");

  //loading image for enemy
  enemy_1 = loadImage("alien1.png");

  //loading gameover image
  gameover_image = loadAnimation("gameover.png");

  //loading sounds
  cuttingSound = loadSound("knifeSwooshSound.mp3");
  endSound = loadSound("gameover.mp3");
}

function setup() {

  //creating knife sprite
  knife = createSprite(200, 200);
  knife.addAnimation("knife", knifeImage);
  knife.addAnimation("gameOver", gameover_image);
  knife.scale = 0.7;

  //creating group for fruit and enemy
  fruitsGroup = new Group();
  enemyGroup = new Group();

}

function draw() {

  //creating canvas
  createCanvas(400, 400);

  //setting background
  background("lightBlue");

  //displaying scores
  fill("black");
  textSize(15);
  text("Score: " + Score, 325, 30);

  //statement for gameState play
  if (gameState === PLAY) {

    //calling fruit and enemy functions
    fruits();
    enemy();

    //setting motion of knife  
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    //statement for fruits when touching knife  
    if (fruitsGroup.isTouching(knife)) {
      //destroying fruitsGroup
      fruitsGroup.destroyEach();

      //playing cutting sound
      cuttingSound.play();

      //increementing scores
      Score=Score+1;
     
    }
      
    //statement for fruits when touching knife  
    if (knife.isTouching(enemyGroup)) {

      //gameState is end
      gameState = END;

      //destroying enemy and fruits groups
      enemyGroup.destroyEach();
      fruitsGroup.destroyEach();

      //seeting velocity as zero of enemy and enemy groups
      fruitsGroup.setVelocityEach(0);
      enemyGroup.setVelocityEach(0);

      //changing animation to gameover
      knife.changeAnimation("gameOver", gameover_image);

      //playing endSound
      endSound.play();

      //resetting position of knife
      knife.x = 200;
      knife.y = 200;
    }

  }
  //drawing sprites  
  drawSprites();

}

function fruits() {

  if (World.frameCount % 75 === 0) {

    //creating fruit sprite
    fruit = createSprite(400, 200, 20, 20);

    r = Math.round(random(1, 4));

    //choosing fruitImage via randomization

    if (r === 1) {
      fruit.addImage(fruit1);
    } else if (r === 2) {
      fruit.addImage(fruit2);
    } else if (r === 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    //scaling fruitImage
    fruit.scale = 0.170;

    //placing fruits at random y positions
    fruit.y = Math.round(random(50, 340));

    //setting velocityX of fruit
    fruit.velocityX = -7;

    //setting lifetime of fruit
    fruit.lifetime = 100;
    
    //making fruits come from both sides
    position = Math.round(random(1, 2));

    if (position === 1) {
      //setting the x position of fruit in the right corner
      fruit.x = 400;
      
      //increasing velocity after score reaches 4 or 10
      fruit.velocityX = -(7 + Math.round(Score / 4));
    }
    if (position === 2) {
      //setting the x position of fruit in the left corner
      fruit.x = 0;

      //increasing velocity after score reaches 4 or 10
      fruit.velocityX = (7 + Math.round(Score / 4));
    }

    //add fruit to fruitsgroup
    fruitsGroup.add(fruit);

  }
}

function enemy() {
  //creating enemy after passing 200 frames
  if (World.frameCount % 200 === 0) {

    //creating enemy sprite
    var enemy = createSprite(400, 200, 20, 20);

    //adding image to enemy
    enemy.addImage(enemy_1);

    //placing enemy at random y positions
    enemy.y = Math.round(random(100, 300));

    //setting lifetime of enemy
    enemy.setLifeime = 100;
     
    //making enemy come from both sides
    ep = Math.round(1, 2);

    if (ep === 1) {
      //setting x position of enemy
      enemy.x = 400;

      //setting velocityX of enemy
      enemy.velocityX = -(10 + Math.round(Score / 10));
    }
    if (ep === 2) {
      //setting x position of enemy
      enemy.x = 0;

      //setting velocityX of enemy
      enemy.velocityX = (10 + Math.round(Score / 10));
      
    }
    //adding enemy to enemyGroup
    enemyGroup.add(enemy);

  }
}