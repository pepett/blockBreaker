class Line{
    constructor(x,y,g){
        this.x = x;
        this.y = y;
        this.g = g;
    }

    draw()
    {
        this.g.fillStyle = 'white';
        this.g.fillRect(this.x,this.y,50,5);
    }

    update(_x)
    {
        this.x += _x;
    }
}