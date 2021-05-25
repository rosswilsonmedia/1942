var hero = {
    x: 300,
    y: 300
}

var enemies = [{x:50, y:50}, {x: 250, y: 50}, {x: 450, y:50}];

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

function moveEnemies(){
    for(var i=0; i<enemies.length; i++){
        enemies[i].y+=5;
    }
}

function gameLoop(){
    displayHero();
    moveEnemies();
    displayEnemies();
}

setInterval(gameLoop, 100);

document.onkeydown = function(a){
    console.log(a.keyCode);
    if(a.keyCode==37){
        hero.x-= 10;
    } else if(a.keyCode==39){
        hero.x+=10;
    } else if(a.keyCode==38){
        hero.y-=10;
    } else if(a.keyCode==40){
        hero.y+=10;
    }
    displayHero();
}
displayHero();
displayEnemies();