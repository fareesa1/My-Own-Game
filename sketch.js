var obstaclesGroup, obstacle1, obstacle2
var coin, coinGroup
var score = 0
var lives = 4
var handleControl = true

function setup() {
  createCanvas(800,400);

  bg = createSprite(2500,30,3000,300)
  bg.addImage(bg_image)
  
  plr = createSprite(400, 200, 50, 50);
  plr.addAnimation("run", plr_run)
  plr.addAnimation("idle", plr_idle)
  plr.addAnimation("dead", plr_dead)
  plr.scale = 0.3
  plr.debug=true
  plr.setCollider("rectangle", 50,0, 200,430)
  ground = createSprite(2500,plr.y+100,5000,10)
  ground.visible = false

  obstaclesGroup = new Group();
  coinGroup = new Group();

  wall = createSprite(350,200,20,500)
  wall.visible = false

  spawnObstacles();
  spawnCoins();
}

function preload(){
  plr_run = loadAnimation("png/run1.png", "png/run2.png", "png/run3.png", "png/run4.png", "png/run5.png", "png/run6.png", "png/run7.png", "png/run8.png",)
  bg_image = loadImage("bg.jpg")
  plr_idle = loadAnimation("png/idle2.png")
  plr_dead = loadAnimation("png/dead4.png")
  obstacle1 = loadImage("png/obstacle1.png")
  obstacle2 = loadImage("png/obstacle2.png")  

  coinImg = loadImage("png/coin.png")
}

function draw() {
  background(0); 
  plr.collide(wall)
  drawSprites();
  plr.collide(ground)

  if(plr.isTouching(wall)){
    fill("black")
    stroke(3)
    text("Press Right Arrow Key to Start the Game", wall.x,100)
    plr.collide(wall)
    
  }

  if(handleControl == true){

  if(keyDown("down")&& plr.y>190){
    plr.velocityY = -18
    }

    if(keyDown("up")&& plr.y>190){
      plr.velocityY = -10
      }
      plr.velocityY+= 1
    
    if(keyWentDown(RIGHT_ARROW)){
      plr.changeAnimation("run")
      plr.velocityX=8
      plr.mirrorX(1)
    }
    if(keyWentUp(RIGHT_ARROW)){
      plr.changeAnimation("idle")
      plr.velocityX=0
    }
    
    if(keyWentDown(LEFT_ARROW)){
      plr.changeAnimation("run")
      plr.velocityX=-8
      plr.mirrorX(-1)
    }
    if(keyWentUp(LEFT_ARROW)){
      plr.changeAnimation("idle")
      plr.velocityX=0
    }
  }
    stroke(3)
    textSize(32)
    fill("black")
    text('Score: '+score, plr.x+200,plr.y-250)
    text('Lives: '+lives, plr.x+50,plr.y-250)

  if(plr.y>100){
    camera.y=plr.y-100;
  }
  camera.x=plr.x;
  //camera.y=plr.y-100;

 

//if(plr.x-cactus.x>200) cactus.x=plr.x+200;
//if(cactus.x-plr.x>200) cactus.x=plr.x-200;

if(coinGroup.isTouching(plr)){
  score+=1
coinGroup[0].destroy()

}

if(plr.isTouching(obstaclesGroup)){
  obstaclesGroup[1].destroy()
  lives-=1
  }

  if(lives <=0){
    textSize(60)
    fill("white")
    text('Game Over', plr.x-100,plr.y-50)
    plr.velocityX = 0
handleControl = false
plr.changeAnimation("dead")
  }

}

function spawnObstacles(){
  for(var i=0; i<4000; i+=400)  {
    var obstacle = createSprite(i, random(250,280), 10, 40);
    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }

    obstacle.scale = 0.15;
    obstaclesGroup.add(obstacle)
    obstacle.depth=plr.depth+1
  }
}

function spawnCoins(){
  for(var i=0; i<4000; i+=325)  {
    var coin = createSprite(i, 110, 10, 40);
    //var rand = Math.round(random(1,1));
    //switch(rand){
    //  case 1: coin.addImage(coinImg);
    //          break;
    //  default: break;
    //}
    coin.scale = 0.1;
    coin.addImage(coinImg)
    coinGroup.add(coin)
    coin.depth=plr.depth+1
  }
}