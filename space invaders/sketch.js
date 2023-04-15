var rocket , rocketImage;
var met ,metGroup, metImage;
var coin , coinImage,coinsGroup ;
var bg ,bgImage;
var go,goImage; 
var replay,replayImage; 
var score;
   
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
   rocketImage = loadImage("rocket.png") ;
   metImage = loadImage("met.png");
   coinImage = loadImage("coin.png");
   bgImage = loadImage("space.png");
   goImage = loadImage("game over.png");
   replayImage = loadImage("replay.png");
}

function setup () {
  canvas = createCanvas(400,380);
  
  bg = createSprite(200, 150, 20, 20);
  bg.addImage(bgImage);
 // bg.scale = 0.86;
  bg.velocityY = 8;
  
  rocket = createSprite(200, 280, 20, 20);
  rocket.addImage(rocketImage);
  rocket.scale = 0.3;
  
  rocket.debug = false;
  rocket.setCollider("circle",0,0,180);
  
  go = createSprite(200,160,20,20);
  go.addImage(goImage)
  go.visible = false;
  
   replay = createSprite(200,300,20,20);
   replay.addImage(replayImage);
   replay.scale = 0.2;
   replay.visible = false;
  
  
  
  coinsGroup = createGroup();
  metGroup = createGroup();

  score = 0;
}

function draw () {
  background("white");
  
  
  
   if (gameState === PLAY) { 
    
     
     
     
     
   if (bg.y > 180) {
     bg.y = 150;
     
   } 
   
   if (rocket.isTouching(coinsGroup)) {
       coinsGroup.get(0).destroy()
       score = score + 1
       }
   
   if (rocket.isTouching(metGroup)) {
       gameState = END;
     
       }
        
   if (keyDown("left")) {
       rocket.x = rocket.x-2;
       
       } 
    if (keyDown("right")) {
       rocket.x = rocket.x+2;
       
       } 
     spawnMeteors();
    spawnCoins();
   }
  
     if (gameState === END) {
         go.visible = true;
         replay.visible = true;
         bg.visible = false
         coin.visible = false;
         rocket.visible = false;
         met.visible = false;
         coinsGroup.destroyEach();       
         metGroup.destroyEach();
         //reset();
       
         if(mousePressedOver(replay)) {
      reset();
         }
       
         }
     


    
  drawSprites();
  textSize(20);
  text("Score : " +score, 10,30);
}
function spawnCoins () {
 if (frameCount%80===0) {
   coin = createSprite(200,-20,20,20)    
   coin.addImage(coinImage);  
   coin.velocityY = 2;
   coin.scale = 0.1;
   coin.x = Math.round(random(10,380))
   coin.lifetime = 200;
   rocket.depth = coin.depth;
   rocket.depth = coin.depth+1;
   coinsGroup.add(coin);
     } 
  
  
}

function spawnMeteors () {
 if (frameCount%140===0) {
   met = createSprite(200,-20,20,20)    
   met.addImage(metImage);  
   met.velocityY = 2;
   met.scale = 0.1;
   met.x = Math.round(random(100,300))
   metGroup.add(met);
     } 
  
  
}
 function reset (){
   gameState = PLAY;
   go.visible = false ;
   replay.visible = false ;
   coin.visible = true;
   bg.visible = true;
   rocket.visible = true;
   met.visible = true;
   score.visible = true;
   score = 0
   
 }
