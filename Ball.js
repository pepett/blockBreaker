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
        this.g.arc(this.x,this.y,15,0,2 * Math.PI,false);
        this.g.fill();
    }

    update(_x,_y)
    {
        this.x += _x;
        this.y += _y;
    }
}