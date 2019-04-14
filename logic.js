let canvas;
let canvasContext;
let ballX = 400;
let ballY = 300;
let ballSpeedX = -10;
let ballSpeedY = -6;
let padH = 200;
let bPadY = 250;
let pPadY = 250;
let playerScore = 0;
let botScore = 0;
const winningScore = 10;

function calculateMousePos(evt){
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

window.onload = function(){
    canvas = document.getElementById('canvasGame');
    canvasContext = canvas.getContext('2d');
    setInterval(function(){
        draw();
        move();
    },10);

    canvas.addEventListener("mousemove", function(evt){
        let mousePos = calculateMousePos(evt);
        pPadY = mousePos.y-padH/2;
    })

}

function ballReset(){
    ballX = 400;
    ballY = 300;
    if(playerScore === winningScore){
        location.replace('https://giphy.com/gifs/cat-animated-eOtgFmrlkoJUs/fullscreen');
    }
    if(botScore === winningScore){
        location.replace('https://cdn.drawception.com/images/panels/2017/11-30/7pbGG7CKFs-2.png')
    }
}

function AI(){
    if (ballY+20 < bPadY + padH / 2)
        bPadY -= 5;
    else if(ballY-20 > bPadY + padH /2)
        bPadY += 5;
}

function move(){
    AI();
    ballX+=ballSpeedX;
    ballY+=ballSpeedY;
    //bot
    if(ballX > canvas.width-15)
        if(ballY < bPadY || ballY > bPadY+padH){
            ballSpeedX *= -1;
            playerScore++;
            ballReset();
        }
        else {
            ballSpeedX *= -1;
            if(ballY < bPadY+padH/5)
                ballSpeedY = -5;
            else if (ballY < bPadY+padH*2/5)
                ballSpeedY = -3;
            else if (ballY < bPadY+padH*3/5)
                ballSpeedY = 0;
            else if (ballY < bPadY+padH*4/5)
                ballSpeedY = 3;
            else
                ballSpeedY = 5;
        }
    //player
    if(ballX < 14)
        if(ballY < pPadY || ballY > pPadY+padH){
            ballSpeedX *= -1;
            botScore++;
            ballReset();
        }
        else{
            ballSpeedX *= -1;
            if(ballY < pPadY+padH/5)
                ballSpeedY = -5;
            else if (ballY < pPadY+padH*2/5)
                ballSpeedY = -3;
            else if (ballY < pPadY+padH/2)
                ballSpeedY = 0;
            else if (ballY < pPadY+padH*4/5)
                ballSpeedY = 3;
            else
                ballSpeedY = 5;
        }

    if(ballY > canvas.height-15)
        ballSpeedY *=-1;
    if(ballY < 5)
        ballSpeedY *=-1;

}

function drawNet(){
    for(let i = 0; i < canvas.height; i+=40){
        helpDraw(canvas.width/2-1,i,2,20,'white');
    }
}

function draw(){
    helpDraw(0,0,canvas.width,canvas.height,'black');
    drawNet();
    //player
    helpDraw(0,pPadY,10,padH,'grey');
    //AI
    helpDraw(canvas.width-10,bPadY,10,padH,'grey');
    drawBall(ballX,ballY,5,'pink');
    canvasContext.fillText(botScore,canvas.width-100,100);
    canvasContext.fillText(playerScore,100,100);
}

function helpDraw(x,y,w,h,color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,w,h);
}

function drawBall(x,y,radius,color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x,y,radius,0,Math.PI*2,true);
    canvasContext.fill();
}
