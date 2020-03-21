export default class SpaceShip  {
    constructor(animation){
        this.canvas = animation.canvas
        this.ctx = animation.ctx
        this.coordinateX = this.canvas.width/2
        this.coordinateY = this.canvas.height/2
        this.h = 50
        this.coordinateFire = {
            coordinateX : this.coordinateX,
            coordinateY : this.coordinateY-50
        }
    }

    init(){
        this.draw()
    }

    draw(){
        this.ctx.beginPath()
        this.ctx.lineTo(this.coordinateX, this.coordinateY-this.h)//angle au dessus centre
        this.ctx.lineTo(this.coordinateX-this.h, this.coordinateY+this.h)//angle droit bas
        this.ctx.lineTo(this.coordinateX+this.h, this.coordinateY+this.h)//angle gauche haut
        this.ctx.fill()
        this.ctx.closePath()
    }
    updateCoordinate(){

    }
}