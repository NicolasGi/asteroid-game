export default class Meteor {
    constructor(animation){
        this.animation = animation
        this.canvas = this.animation.canvas
        this.ctx = this.animation.ctx
        this.radius = 25
        this.coordinateX = this.radius + Math.floor(Math.random() * (this.animation.canvas.width - 2 * this.radius))
        this.coordinateY = this.radius + Math.floor(Math.random() * (this.animation.canvas.height - 2 * this.radius))
        this.color = ['blue', 'red', 'yellow']
        this.colorM = this.color[Math.floor(Math.random()*2)+1]
        this.velocityX = 5 + Math.floor(Math.random()*5) ;
        this.velocityY = 5 + Math.floor(Math.random()*5);
    }

    init(){
        this.draw()
    }
    draw() {
        this.ctx.save()
        this.ctx.beginPath()

        this.ctx.fillStyle = this.colorM;

        this.ctx.arc(this.coordinateX, this.coordinateY, this.radius, 0, 2 * Math.PI);

        this.ctx.fill();
        this.ctx.closePath()
        this.ctx.restore()
    }
    updateCoordinate(){
        if(this.coordinateX > this.canvas.width-this.radius || this.coordinateX < this.radius){
            this.velocityX *= -1
        }
        if(this.coordinateY > this.canvas.height-this.radius || this.coordinateY < this.radius){
            this.velocityY *= -1

        }
        this.coordinateX += this.velocityX
        this.coordinateY += this.velocityY

    }
}