class Block{
	constructor(x,y,g){
		this.x = x;
		this.y = y;
		this.g = g;
	}

	draw(){
		this.g.fillStyle = 'gray';
		this.g.fillRect(this.x,this.y,45,25);
	}

}