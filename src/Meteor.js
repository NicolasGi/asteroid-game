import meteorShapes from "./meteorShapes";
import Vector from "./Vector";


export default class Meteor {
    constructor(canvas, ctx, parent = null){
        this.canvas = canvas
        this.ctx = ctx
        this.rotation = 0

        if(!parent){
            this.size = 7 + Math.random() * 5
            this.location = new Vector(Math.random()*this.canvas.width, Math.random()*this.canvas.height )
            this.rotationSpeed = Math.random() /30

        }else{
            this.size = parent.size/2
            this.location = new Vector(parent.location.x, parent.location.y)
            this.rotationSpeed = parent.rotationSpeed * 2
        }
        this.heading = Math.random() * Math.PI*2

        this.speed = new Vector(0,0)
        this.acceleration = Vector.fromAngle(this.heading, 2+Math.random() * 2)
        this.speed.add(this.acceleration)

        const asCount = meteorShapes.length
        const i = Math.floor(Math.random() * asCount)
        this.shape = meteorShapes[i]
        this.path = new Path2D()
        this.createPath()

    }
    createPath(){
        this.path.moveTo(this.shape[0]*this.size, this.shape[1]*this.size)
        let i = 2
        const shapePointsCount = this.shape.length
        while(i <= shapePointsCount-2){
            this.path.lineTo(this.shape[i]*this.size, this.shape[++i]*this.size);
            i++
        }

        this.path.closePath()
    }
    checkEdges(){
        const offset = 50
        if (this.location.y > this.canvas.height + offset) {
            this.location.y = offset
        }
        if (this.location.y < -offset) {
            this.location.y = this.canvas.height + offset
        }
        if (this.location.x > this.canvas.width + offset) {
            this.location.x = offset
        }
        if (this.location.x < -offset) {
            this.location.x = this.canvas.width + offset
        }
    }
    update(){
        this.location.add(this.speed)
        this.rotation += this.rotationSpeed
        this.checkEdges()
        this.draw()
    }
    draw() {
        this.ctx.save()
        this.ctx.translate(this.location.x,this.location.y)
        this.ctx.rotate(this.rotation)
        //this.ctx.beginPath()
        this.ctx.fill(this.path)
        this.ctx.restore()
    }
}