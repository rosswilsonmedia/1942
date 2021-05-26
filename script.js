var hero = {
    x: 500,
    y: 500
}

var score=0;

var enemies = [{x:50, y:10}, {x: 250, y: 110}, {x: 450, y:20}, {x: 550, y: 250}, {x: 750, y: 100}, {x: 625, y: 80}, {x: 900, y: 30}];

var bombers = [];

var bullets=[];

var explosions=[];

var explosionSFX=document.getElementById('explosionSFX');
var fireSFX=document.getElementById('fireSFX');

function displayScore(){
    document.getElementById('score').innerHTML=score;
}

function displayHero(){
    document.getElementById('hero').style['top'] = hero.y + "px";
    document.getElementById('hero').style['left'] = hero.x + "px";
}

function displayEnemies(){
    var output='';
    for(var i=0; i<enemies.length; i++){
        output+="<div class='enemy1' style='top:"+enemies[i].y+"px; left:"+enemies[i].x+"px;'></div>";
    }
    document.getElementById('enemies').innerHTML=output;
}

function displayBombers(){
    var output='';
    for(var i=0; i<bombers.length; i++){
        output+="<div class='enemy2' style='top:"+bombers[i].y+"px; left:"+bombers[i].x+"px;'></div>";
    }
    document.getElementById('bombers').innerHTML=output;
}

function moveEnemies(){
    for(var i=0; i<enemies.length; i++){
        enemies[i].y+=5;
        if(enemies[i].y>520){
            enemies[i].y=-10;
            enemies[i].x=Math.floor((Math.random()*97)+1)*10;
        }
    }
}

function moveBombers(){
    for(var i=0; i<bombers.length; i++){
        bombers[i].y+=2;
        if(bombers[i].y>500){
            bombers[i].y=-10;
            bombers[i].x=Math.floor((Math.random()*95)+2)*10;
        }
    }
}

function moveBullets(){
    for(var i=0; i<bullets.length; i++){
        bullets[i].y-=5;
        if(bullets[i].y<0){
            bullets[i]=bullets[bullets.length-1];
            bullets.pop();
        }
    }
}

function displayBullets(){
    var output='';
    for(var i=0; i<bullets.length; i++){
        output+="<div class='bullet' style='top:"+bullets[i].y+"px; left:"+bullets[i].x+"px;'></div>";
    }
    document.getElementById('bullets').innerHTML=output;
}

function displayExplosions(){
    var output='';
    for(var i=0; i<explosions.length; i++){
        output+="<div class='explosion' style='top:"+explosions[i].y+"px; left:"+explosions[i].x+"px;'></div>";
    }
    document.getElementById('explosions').innerHTML=output;
}

function detectBulletCollision(){
    for(var i=0; i<bullets.length; i++){
        for(var j=0; j<enemies.length; j++){
            if(Math.abs(bullets[i].x - enemies[j].x)<10
            && Math.abs(bullets[i].y - (enemies[j].y+20))<10){
                score+=10;
                explosions.push({x: bullets[i].x-7, y: bullets[i].y-7});
                explosionSFX.play();
                bullets[i]=bullets[bullets.length-1];
                bullets.pop();
                enemies[j].x=Math.floor((Math.random()*97)+1)*10;
                enemies[j].y=-10;
            }
        }
        for(var k=0; k<bombers.length; k++){
            if(Math.abs(bullets[i].x - (bombers[k].x + 25))<30
            && Math.abs(bullets[i].y - (bombers[k].y + 10))<30){
                bombers[k].hp=bombers[k].hp-1;
                explosions.push({x: bullets[i].x-7, y: bullets[i].y-7});
                bullets[i]=bullets[bullets.length-1];
                bullets.pop();
                score+=10;
                explosionSFX.load();
                explosionSFX.play();
                if(bombers[k].hp==0){
                    score+=100;
                    bombers[k].x=Math.floor((Math.random()*95)+2)*10;
                    bombers[k].y=-10;
                    bombers[k].hp=10;
                }
            }
        }
    }
}

function detectHeroCollision(){
    for(var i=0; i<enemies.length; i++){
        if(Math.abs(enemies[i].x - hero.x)<10
        && Math.abs(enemies[i].y - hero.y)<10){
            score-=20;
            explosionSFX.play();
            enemies[i]=enemies[enemies.length-1];
            enemies.pop();
        }
    }
    for(var j=0; j<bombers.length; j++){
        if(Math.abs(bombers[j].x - hero.x)<10
        && Math.abs(bombers[j].y - hero.y)<10){
            score-=200;
            explosionSFX.play();
            bombers[i]=bombers[bombers.length-1];
            bombers.pop();
        }
    }
}

function gameLoop(){
    explosions=[];
    displayHero();
    moveEnemies();
    displayEnemies();
    moveBombers();
    displayBombers();
    moveBullets();
    displayBullets();
    detectBulletCollision();
    detectHeroCollision();
    displayExplosions();
    displayScore();
}

setInterval(gameLoop, 33.33);

setInterval(function(){
    bombers.push({x: Math.floor((Math.random()*95)+2)*10, y: -10, hp: 10});
    displayBombers();
}, 10000);

document.onkeydown = function(a){
    console.log(a.key);
    if((a.key=='ArrowLeft' || a.key=='a') && hero.x>10){
        hero.x-= 10;
    } else if((a.key=='ArrowRight' || a.key=='d') && hero.x<970){
        hero.x+=10;
    } else if((a.key=='ArrowUp' || a.key=='w') && hero.y>10){
        hero.y-=10;
    } else if((a.key=='ArrowDown' || a.key=='s') && hero.y<520){
        hero.y+=10;
    } else if(a.key==' '){
        bullets.push({x: hero.x+8, y: hero.y-15});
        fireSFX.load();
        fireSFX.play();
        displayBullets();
    }
    displayHero();
}
displayHero();
displayEnemies();