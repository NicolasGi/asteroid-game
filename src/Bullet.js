import Vector from './Vector'
import ship from './ship'
import garbageManager from "./garbageManager";

export default class Bullet {
    constructor(){
        this.ctx = ship.ctx
        this.location = new Vector(ship.location.x,ship.location.y)
        this.heading = ship.heading
        this.size = 1
        this.speed = new Vector(ship.speed.x, ship.speed.y)
        this.acceleration = Vector.fromAngle(this.heading, 10)
        this.speed.add(this.acceleration)
    }
    checkEdges(){
        if ((this.location.y > ship.canvas.height + this.size)
            || (this.location.y < -this.size)
            || (this.location.x > ship.canvas.width + this.size)
            || (this.location.x < -this.size)
        ) {
            garbageManager.remove(this, ship.bullets)
        }
    }
    update(){
        this.location.add(this.speed)
        this.checkEdges()
        this.draw()
    }

    draw(){
        this.ctx.save()
        this.ctx.translate(this.location.x, this.location.y)
        this.ctx.rotate(this.heading)
        this.ctx.fillStyle = 'white';

        this.ctx.fillRect(-this.size/2, -this.size*3, this.size, this.size)

        this.ctx.restore()
    }
}