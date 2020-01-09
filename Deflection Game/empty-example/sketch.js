var x = 725;
var speed = 11;
var hit = false;
var xBallChange = 20;
var yBallChange = 20;
var res = false;
var menu_button=200, menu_button1=100,menu_button2 = 70;
var MenuS = true;
var diameter = 100;
var score= 0;
var xBall;
var yBall;
var count = 3;
var topscore= [-1,-1,-1,-1,-1];
var Menu = true;
var colorbutton=230;
var easyColor,hardColor1,button1C=255;
var mediumColor1 = 255; 
var rs = 144, re = 144,rm = 144,rh = 144;
var gs = 202 ,ge=202 ,gm=202 ,gh = 202;
var bs=249 ,be=249 ,bm=249 ,bh = 249;
var color12 = 200 , color1=100, color2=70;
var pongLength = 150;
var easyM = false, medM = true, hardM = false;

function setup() {
  createCanvas(windowWidth,750);
   xBall=Math.round(random(100,windowWidth/2));
   yBall = 50;
   x = Math.round(random(windowWidth/2,windowWidth-100));
  }

function draw() {
  background(24,123,205);
  textSize(25);
  xBall +=xBallChange;
  yBall +=yBallChange;

  if (xBall < diameter/2 || xBall > windowWidth - 0.5*diameter) {
    if(xBall < diameter/2) xBall+= 5;
    if(xBall>windowWidth - 0.5*diameter) xBall-=5;
    xBallChange = -xBallChange;
  }
  if (yBall < diameter/2) {
    yBallChange = -yBallChange;
  } else if (yBall > 750 - 0.5*diameter){
      count-=1;
      yBallChange = -yBallChange;
  }
  
fill(255,77,4);
textSize(40);
if (res) text("Best Scores \n"+topscore[0]+"\n"+topscore[1]+"\n"+topscore[2]+"\n"+topscore[3]+"\n"+topscore[4],100,300);
text("Hint: Pong can wrap around to other side of screen.",320,700);
  
if(hit){ //What happens when collision
    if(xBall<=x+50 && xBallChange < 0){   //If ball hits left side of pong if negative x direction
      if (xBallChange < 0) {
        xBallChange -= 0.1;
        yBallChange += 0.1;
      } else {
        xBallChange+=0.1;
        yBallChange+=0.1; 
      }
      yBallChange = -yBallChange;
      
    } else if (xBall >=x-50 && xBallChange > 0){ //If ball hits right side of pong in positive x direction
      if (xBallChange < 0) {
        xBallChange -= 0.1;
        yBallChange+=0.1;
      } else {
        xBallChange+=0.1;
        yBallChange+=0.1; 
      }
      yBallChange = -yBallChange;
      } else {
        if (xBallChange < 0) {
          xBallChange -= 0.1;
          yBallChange+=0.1;
        } else {
          xBallChange+=0.1;
          yBallChange+=0.1; 
        }
      xBallChange = -xBallChange;
      yBallChange = -yBallChange;
   }
    yBall -=30; //Teleports ball up 30 spots to end collision
    score++;
    hit = false;
  } 
  
  fill(200,100,70);
  rect(x,600,pongLength,30); //Pong
  
  if (count == 3){
    fill(255);
  } else if (count == 2){
    fill(240,128,128);
  } else if (count == 1){
    fill(255,0,0);
  } else fill(178,34,34);
  
  ellipse(xBall,yBall,diameter,diameter); //Ball
  hit = collideRectCircle(x,600,pongLength,30,xBall,yBall,100); //Collision detection function
  fill(255,77,4);
  textSize(40);
  text("Score:"+score+"\n"+"Lives: "+count,100,100)
  fill(255);
  
// Controls and wall wrap around
  if (keyIsDown(LEFT_ARROW)){
    x=x-speed;
     }
  if(keyIsDown(RIGHT_ARROW) ){
    x=x+speed;
  }
  if(x > 1550) {
    x = -200;
  } else if (x < -200){
    x = 1545;
  }

  if(count <= 0 && MenuS == false){
    xBallChange = 0;
    yBallChange = 0;
    fill(color12,color1,color2);
    rect(650,300,240,100); // Restart button
    fill(menu_button,menu_button1,menu_button2);
    rect(650,175,240,100); // To menu button
    textSize(50);
    fill(0);
    text("RESTART",655,370);
    text("MENU",695,245)
    yBall = 10;
    textSize(25);
    if (score >= topscore[4]) topscore[4] = score;
    res = true;
    }

  //MENU/START SCREEN
if (Menu){   
  fill(255,102,51);
  rect(0,0,1540,810); // Menu background
  fill(rs,gs,bs);
  rect(650,300,240,100); //Start
  fill(rm,gm,bm);
  rect (710,550,120,50);//Medium
  fill(144,202,249);
  textSize(100);
  text("SPEED PONG",430,100);
  fill (rh,gh,bh);
  rect (930, 550, 120,50);// Hard
  textSize(30);
  fill (re,ge,be);
  rect (480, 550, 120, 50);// Easy
  fill(255,102,0);
  text("Easy                 Medium                Hard",510,585);
  fill(144,202,249);
  text("Select Difficulty Before Starting",555, 650)
  textSize(65);
  text("How long can you last?",430,200);
  text("Beta 1.0",1270,740);
  fill(255,102,51);
  text("START",670,375);
    }
} // End of draw

function restart(){ // resets score, ball etc. to play again
xBall=Math.round(random(100,windowWidth/2)); // Places ball on random spot on top of the screen
x = Math.round(random(windowWidth/2,windowWidth-100)); // Places pong on the right side of the screen to prepare user
yBall = 50;
if (easyM){
  xBallChange = 8;
  yBallChange = 8;
} else if (medM){
  xBallChange = 10;
  yBallChange = 10;
} else if (hardM){
  xBallChange = 12;
  yBallChange = 12;
}
res = false;
score = 0;
count = 3;
topscore.sort(function(a, b){return b-a});
}

function mousePressed(){
  if ((mouseX>=650 && mouseX<=890) && (mouseY>=300 && mouseY<=400) && res ==true){
    color12 = 0,color2=0,color1=0; // Restart
  }
  if ((mouseX>=650 && mouseX<=890) && (mouseY>=175 && mouseY<=275) && res == true) menu_button = 0,menu_button1=0,menu_button2=0; // To Menu Button
  if ((mouseX>=650 && mouseX<=890) && (mouseY>=300 && mouseY<=400) && MenuS==true) rs = 0, gs = 0, bs = 0;//Start Button
		
	if ((mouseX>=480 && mouseX<=600) && (mouseY>=550 && mouseY<=600)&& MenuS==true){ //Easy
    re = 0, ge = 0, be = 0;
    rm = 144, rh = 144, gm = 202, gh = 202, bm = 249, bh = 249;
    pongLength = 200;
    speed = 10;
    medM = false, easyM = true, hardM = false;
    xBallChange = 8;
    yBallChange = 8;
    } else if ((mouseX>=710 && mouseX<=830) && (mouseY>=550 && mouseY<=600)&& MenuS==true){ //Medium 
      rm = 0, gm = 0, bm = 0;
      re = 144, rh = 144, ge = 202, gh = 202, be = 249, bh = 249;
      pongLength = 150;
      speed = 11;
      medM = true, easyM = false, hardM = false;
      xBallChange = 10;
      yBallChange = 10;
    } else if ((mouseX>=930 && mouseX<=1050)&& (mouseY>=550 && mouseY<=600)&& MenuS==true){ //hard
      rh = 0, gh = 0, bh = 0;
      rm = 144, re = 144, gm = 202, ge = 202, be = 249, bm = 249;
      pongLength = 100;
      speed = 13;
      medM = false, easyM = false, hardM = true;
      xBallChange = 12;
      yBallChange = 12;
    }
}

function mouseReleased(){
  if ((mouseX>=650 && mouseX<=890) && (mouseY>=300 && mouseY<=400) && res ==true){ //Restart Button
    color12 = 200,color1=100,color2=70;
    restart();
  }
  
  if ((mouseX>=650 && mouseX<=890) && (mouseY>=175 && mouseY<=275) && res == true) {
    menu_button = 200,menu_button1=100,menu_button2=70;
    MenuS = true;
    Menu = true;
  }

  if ((mouseX>=650 && mouseX<=890) && (mouseY>=300 && mouseY<=400) && MenuS==true){ //Start Button
    Menu=false;
    colorbutton=255;
    rs = 144, gs = 202, bs = 249
    MenuS=false;
    restart();
    topscore = [-1,-1,-1,-1,-1];
    }
}

