let cvs = document.getElementById("flappybird");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();
let fg = new Image();

let grav =0.3
let change = 5

bird.src = "images/bird5_up.png";
bg.src = "images/bg.png";
pipeUp.src = "images/pipeUp.png";
pipeBottom.src = "images/pipeBottom.png";
fg.src = "images/fg.png";

let xPos = 10;
let yPos = 150;

let x = cvs.width;
let y = 0;

let gap = 110;

pipes_x = [cvs.width, cvs.width + 250];
pipes_y = [0, -100];

document.addEventListener('click', function() {
    change = 4
})

let score = 0

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipes_x.length; i++) {
        ctx.drawImage(pipeUp, pipes_x[i], pipes_y[i]);
        ctx.drawImage(pipeBottom, pipes_x[i], pipes_y[i] + pipeUp.height + gap);
        pipes_x[i] = pipes_x[i] - 2;

        if (pipes_x[i] === 50) {
            pipes_x.push(pipes_x[pipes_x.length - 1] + 250);
            pipes_y.push(Math.floor(Math.random() * pipeUp.height) - pipeUp.height);
        }

        if (pipes_x[i] == 10){
            score = score + 1
        }

        if (xPos + bird.width >= pipes_x[i] && xPos <= pipes_x[i] + pipeUp.width && (yPos <= pipes_y[i] + pipeUp.height || yPos + bird.height >= pipes_y[i] + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            pipes_x = [cvs.width];
            pipes_y = [0];
           
            xPos = 10;
            yPos = 150;
            change = 5;
            score = 0;
        }
    }
    yPos = yPos - change
    change = change - grav

    ctx.drawImage(bird, xPos, yPos);
    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

draw();
