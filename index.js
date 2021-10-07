window.onload = ()=>{
    let canvas;
    let g;

    const WIDTH = 500;
    const HEIGHT = 500;
    const FONT = '32px sans-serif';

    let startFlag;
    let ballFlag;
    let gameFlag;
    let line;
    let revers_x;
    let revers_y;

    let balls = [];

    let keys = {};

    const createCanvas = ()=>{
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
    }

    const getCanvas = ()=>{
        g = canvas.getContext('2d');
    }

    const canvasConfig = ()=>{
        canvas.width = WIDTH;
        canvas.height = HEIGHT; 
        canvas.style.background = 'black';
    }

    const clear = ()=>{
        g.clearRect(0,0,WIDTH,HEIGHT);
    }

    const drawTitle = ()=>{
        clear();
        g.fillStyle = 'white';
        g.font = FONT;
        const text = 'エンターキーでスタート!';
        const textW = g.measureText( text ).width;
        g.fillText(text,( WIDTH - textW ) / 2,200,1000);
        startFlag = true;
    }

    const init = ()=>{
        clear();
        line = new Line( WIDTH / 2 - 15,450,g);
        line.draw();
        revers_x = -5;
        revers_y = -5;
        startFlag = false;
        ballFlag = true;
    }

    createCanvas();
    getCanvas();
    canvasConfig();
    drawTitle();

    const main = ()=>{
        clear();

        if(ballFlag){
            balls.push(new Ball(line.x + 25,line.y - 30,g));
            ballFlag = false;
        }


        if(keys['ArrowLeft'] && line.x >= 10) line.update(-5);
        if(keys['ArrowRight'] && line.x <= WIDTH - 60) line.update(5);

        for(let i = 0;i < balls.length;i ++){

            if(balls[i].x - 15 <= 0) balls[i].vector_x *= -1;
            if(balls[i].x + 15 >= WIDTH) balls[i].vector_x *= -1;
            if(balls[i].y <= 0) balls[i].vector_y *= -1;

            let r = 15;

            if(
                balls[i].x > line.x && balls[i].x < line.x + 50 &&
                balls[i].y > line.y - r && balls[i].y < line.y + 5
            ){
                balls[i].vector_y *= -1;
            }
            if(
                balls[i].x > line.x - r && balls[i].x < line.x + 50 + r &&
                balls[i].y > line.y && balls[i].y < line.y + 5
            ){
                balls[i].vector_x *= -1;
            }

            if(
                Math.pow(line.x - balls[i].x,2) + Math.pow(line.y - balls[i].y,2) < Math.pow(r,2) ||
                Math.pow(line.x + 50 - balls[i].x,2) + Math.pow(line.y - balls[i].y,2) < Math.pow(r,2) ||
                Math.pow(line.x + 50 - balls[i].x,2) + Math.pow(line.y + 5 - balls[i].y,2) < Math.pow(r,2) ||
                Math.pow(line.x - balls[i].x,2) + Math.pow(line.y + 5 - balls[i].y,2) < Math.pow(r,2)
            ){
                balls[i].vector_y = -5;
            }
            
            balls[i].update(balls[i].vector_x,balls[i].vector_y);
            balls[i].draw();

            if(balls[i].y >= HEIGHT){
                balls.splice(i,1);
            }
        }
        line.draw();
        if(balls.length == 0){
            drawTitle();
            startFlag = false;
        }
        requestAnimationFrame(main);
    }

    window.onkeydown = (e)=>{
        if(e.key == 'Enter' && startFlag){
            init();
            requestAnimationFrame(main);
        }
        keys[e.key] = true;
        if(e.key == 'a') balls.push(new Ball(line.x + 25,line.y - 30,g))
    }
    window.onkeyup = (e)=>{
        keys[e.key] = false;
    }


}