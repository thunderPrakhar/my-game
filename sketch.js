var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieimg;
var zombiegroup;
var heart1Img, heart2Img, heart3Img;
var bullet,bulletGroup,bulletImg;
var heart1, heart2, heart3;
var bullets=40;
var gameState="fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg");
  zombieimg = loadImage("assets/02.png");

  
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");

  bulletImg = loadImage("image/01.png");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300);

   heart1=createSprite(900,40,20,20);
   heart1.addImage("heart1",heart1Img)
   heart1.scale = 0.4
   heart1.visible=false;
   
   heart2 = createSprite(1050,40,20,20)
   heart2.addImage("heart2",heart2Img)
   heart2.scale = 0.4
   heart2.visible=false;

   
   heart3 = createSprite(1300,40,20,20)
   heart3.addImage("heart3",heart3Img)
 heart3.scale = 0.4
  
   zombieGroup = new Group();
   bulletGroup = new Group()
}

function draw() {
  background(0); 

if(gameState=="fight"){
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

if(keyDown("RIGHT_ARROW")){
  player.x = player.x+30
}
  if(keyDown("LEFT_ARROW")){
    player.x = player.x-30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet=createSprite(displayWidth-1150,player.y-30,20,10);
  bullet.addImage(bulletImg);
  bullet.scale=0.05
  bullet.velocityX=20;
  bulletGroup.add(bullet);
  player.depth=bullet.depth;
  player.depth=player.depth+2
  player.addImage(shooter_shooting);
  bullets=bullets - 1;

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(bullets==0){
gameState="bullet"
}



//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
        } 
  
  }
 }

if(zombieGroup.isTouching(player)) {

  for(var i=0; i<zombieGroup.length ; i=i+1){
    if(zombieGroup[i].isTouching(player) )
    {
      zombieGroup[i].destroy()
    }
  }
}

spawnzombie();
}
drawSprites();

if(gameState=="bullet") {
 textSize(50);
 fill("yellow")
 text("You ran out of bullets!!!",470,410)
 zombieGroup.destroyEach();
 player.destroy();
 bulletGroup.destroyEach();
}


}


function spawnzombie()
{
if(frameCount %60 == 0)
{
zombie= createSprite(random(500,1100),random(100,500),40,40);
zombie.addImage(zombieimg)
zombie.scale=0.15;
zombie.velocityX=-3;
zombieGroup.add(zombie);
zombie.lifetime = 400
}
}

