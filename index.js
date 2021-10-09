window.onload = ()=>{
    let canvas;
    let g;

    const WIDTH = 500;
    const HEIGHT = 500;
    const FONT_TITLE = '32px sans-serif';
	const FONT_SCORE = '16px sans-serif';

	let score;
    let startFlag;
    let ballFlag;
    let gameFlag;
    let line;
    let revers_x;
    let revers_y;

    let balls = [];
	let blocks = [];
	let blocks_bool = [];

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
		canvas.setAttribute('style','display: block; margin: auto; background: black;')
    }

    const clear = ()=>{
        g.clearRect(0,0,WIDTH,HEIGHT);
    }

    const drawTitle = ()=>{
        clear();
        g.fillStyle = 'white';
        g.font = FONT_TITLE;
        const text = 'エンターキーでスタート!';
        const textW = g.measureText( text ).width;
        g.fillText(text,( WIDTH - textW ) / 2,200,1000);
        startFlag = true;
    }

	const drawScore = ()=>{
		g.fillStyle = 'white';
		g.font = FONT_SCORE;
		const text = `score:${score}`;
		g.fillText(text,50,450,50);
	}

	const drawGameClear = ()=>{
		clear();
		g.fillStyle = 'white';
		g.font = FONT_TITLE;
		const text = 'GameClear!';
		const textW = g.measureText( text ).width;
		g.fillText(text,( WIDTH - textW ) / 2,200,1000);
		drawScore();
	}

	const drawGameOver = () =>{
		clear();
		g.fillStyle = 'white';
		g.font = FONT_TITLE;
		const text = 'GameOver!';
		const textW = g.measureText( text ).width;
		g.fillText(text,( WIDTH - textW ) / 2,200,1000);
	}

    const init = ()=>{
        clear();
        line = new Line( WIDTH / 2 - 15,450,g);
		for(let y = 0;y < 3;y ++){
			blocks[y] = new Array(10);
			blocks_bool[y] = new Array(10);
			for(let x = 0;x < 10;x ++){
				blocks[y][x] = new Block(x * 50 + 2,y * 30 + 10,g);
				blocks_bool[y][x] = 1;
			}
		}
        line.draw();
		score = 0;
        startFlag = false;
        ballFlag = true;
    }

	const reflect = ()=>{
		for(let y = 0;y < blocks.length;y ++){
			for(let x = 0;x < blocks[y].length;x ++){
				if(!blocks_bool[y][x]){
					blocks[y][x] = 0;
				}
			}
		}
	}

	const judge = ()=>{
		let clearCount = 0
		for(let y = 0;y < blocks.length;y ++){
			for(let x = 0;x < blocks[y].length;x ++){
				if(blocks[y][x] == 0) clearCount ++;
			}
		}
		if(clearCount == 30){
			drawGameClear();
		}
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

            let r = 10;

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
                Math.pow(line.x + 50 - balls[i].x,2) + Math.pow(line.y - balls[i].y,2) < Math.pow(r,2)
            ){
                balls[i].vector_y = -5;
            }

            if(
                Math.pow(line.x + 50 - balls[i].x,2) + Math.pow(line.y + 5 - balls[i].y,2) < Math.pow(r,2) ||
                Math.pow(line.x - balls[i].x,2) + Math.pow(line.y + 5 - balls[i].y,2) < Math.pow(r,2)
            ){
                balls[i].vector_y = 5;
            }

			for(let y = 0;y < blocks.length;y ++){
				for(let x = 0;x < blocks[y].length;x ++){

					let block = blocks[y][x];

					if(blocks_bool == 0) continue;
					
					if(
						balls[i].x > block.x&&
						balls[i].x < block.x + 45&&
						balls[i].y > block.y&&
						balls[i].y < block.y + 25
					){
						balls[i].vector_y *= -1;
						blocks_bool[y][x] = 0;
						score += 10;
					}
				}
			}

			balls[i].update(balls[i].vector_x,balls[i].vector_y);
			balls[i].draw();

            if(balls[i].y >= HEIGHT){
                balls.splice(i,1);
            }

			
        }
		for(let y = 0;y < blocks.length;y ++){
			for(let x = 0;x < blocks[y].length;x ++){
				if(blocks[y][x] == 0) continue;
				blocks[y][x].draw();
			}
		}

		reflect();
		judge();

        line.draw();
		drawScore();
        if(balls.length == 0){
            drawGameOver();
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
		if(e.key == 'Escape') document.location.reload();
        if(e.key == 'p') balls.push(new Ball(line.x + 25,line.y - 30,g))
    }
    window.onkeyup = (e)=>{
        keys[e.key] = false;
    }


}