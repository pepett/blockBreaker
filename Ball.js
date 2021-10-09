class Ball{
    constructor(x,y,g){
        this.x = x;
        this.y = y;
        this.g = g;
        this.vector_x = -5;
        this.vector_y = -5;
    }

    draw()
    {
        this.g.fillStyle = 'green';
        this.g.beginPath();
        this.g.arc(this.x,this.y,10,0,2 * Math.PI,false);
        this.g.fill();
		//this.g.fillStyle = 'white'
		//this.g.fillRect(this.x + 10,this.y - 10,2,2);
		//this.g.fillRect(this.x + 10,this.y + 10,2,2);
		//this.g.fillRect(this.x - 10,this.y - 10,2,2);
		//this.g.fillRect(this.x - 10,this.y + 10,2,2);
		//this.g.fillRect(this.x - 15,this.y,2,2);
		//this.g.fillRect(this.x + 15,this.y,2,2);
		//this.g.fillRect(this.x,this.y - 10,2,2);
		//this.g.fillRect(this.x,this.y + 10,2,2);
    }

    update(_x,_y)
    {
        this.x += _x;
        this.y += _y;
    }
}