const gameboard = document.getElementById("gameboard");
const context = gameboard.getContext('2d');
const score = document.getElementById('scorevalue');
let scorevalue = 0;
const WIDTH = gameboard.width;
const HEIGHT = gameboard.height;
const UNIT = 10;

let foodX;
let foodY;
let xVel = 10;
let yVel = 0;
let active=true;
let started = false;
let paused = false;

let serpent = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];

window.addEventListener('keydown',keyPress);

startGame();

function startGame(){
    context.fillStyle = '#54c4e3ff'
    context.fillRect(0,0,WIDTH,HEIGHT)
    createFood();
    displayFood();
    drawserpent();
}

function clearBoard(){
    context.fillStyle = '#54c4e3ff';
    context.fillRect(0,0,WIDTH,HEIGHT);
}

function createFood(){
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}
function displayFood(){
    context.fillStyle = '#000000ff';
    context.fillRect(foodX,foodY,UNIT,UNIT); 
}
function drawserpent(){
    context.fillStyle = '#3A5F5F';
    context.strokeStyle = '#33acc7ff';
    serpent.forEach((midgardPart) =>{
        context.fillRect(midgardPart.x,midgardPart.y,UNIT,UNIT)
        context.strokeRect(midgardPart.x,midgardPart.y,UNIT,UNIT)
    
    })
}
function moveSnake(){
    const head = {x:serpent[0].x+xVel,
        y:serpent[0].y+yVel}
    serpent.unshift(head)
    if(serpent[0].x==foodX && serpent[0].y==foodY){
        createFood();
        score.innerHTML = ++scorevalue;
    }else{
    serpent.pop();}
}
function nextTick(){
    if(active && !paused){
        setTimeout(()=>{
            clearBoard();
            displayFood();
            moveSnake();
            drawserpent();
            checkGameOver();
            nextTick();
        },200)
    }
    else if(!active){
        clearBoard();
        context.font = "bold 40px serif";
        context.fillStyle = '#d34242ff';
        context.textAlign = "center";
        context.fillText("Game Over!! 🔨 ",WIDTH/2,HEIGHT/2);
        context.font = "bolder 20px serif";
        context.fillStyle = '#030502ff';
        context.textAlign = "center";
        context.fillText(`Jormungandr Died!`,WIDTH/2-28,HEIGHT/2+30);
        
    }
}
function keyPress(event){
    if(!started){
        started=true;
        nextTick();
    }
    if(event.keyCode===32){
        if(paused){
            paused = false;
            nextTick();
        }
        else{
            paused = true;
        }
    }
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    switch(true){
        case(event.keyCode==LEFT && xVel != UNIT):
            xVel = -UNIT;
            yVel = 0;
            break;
        case(event.keyCode==RIGHT && xVel != -UNIT):
            xVel = UNIT;
            yVel = 0;
            break;
        case(event.keyCode==UP && yVel != UNIT):
            xVel = 0;
            yVel = -UNIT;
            break;
        case(event.keyCode==DOWN && yVel != -UNIT):
            xVel = 0;
            yVel = UNIT;
            break;
    }
}
function checkGameOver(){
    switch(true){
        case(serpent[0].x<0):
        case(serpent[0].x>=WIDTH):
        case(serpent[0].y<0):
        case(serpent[0].y>=HEIGHT):
            active=false;
            break;
    }
}