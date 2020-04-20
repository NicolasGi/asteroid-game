import controller from "./controller";
import Vector from './Vector';
import Bullet from './Bullet';

const ship = {
    canvas: null,
    ctx: null,
    size: 10,
    location: null,
    acceleration: null,
    speed: null,
    heading: 0,
    bulletTimer:-1,
    bulletTimerTreshold: 5,
    bullets: [],

    init(canvas, ctx) {
        controller.init()
        this.canvas = canvas
        this.ctx = ctx
        this.location = new Vector(this.canvas.width / 2, this.canvas.height / 2)
        this.speed = new Vector(0, 0);
    },
    checkKeys(){
        controller.activeKeys.forEach((activeKey) => {
            if(activeKey === "ArrowUp"){
                this.speed.add(Vector.fromAngle(this.heading))
            }else if(activeKey === "ArrowRight" || activeKey === "ArrowLeft"){
                this.updateHeading(controller.keys[activeKey])
            }else if(activeKey === ' '){
                this.bulletTimer++
                if(!(this.bulletTimer % this.bulletTimerTreshold))
                    this.bullets.push(new Bullet());
            }else{
                this.bulletTimer = -1
            }
        })
    },

    update() {
        this.checkKeys()
        this.speed.multiply(0.97);
        this.location.add(this.speed)

        this.checkEdges()
        this.draw()
    },
    checkEdges(){
        if (this.location.y > this.canvas.height + this.size) {
            this.location.y = this.size
        }
        if (this.location.y < -this.size) {
            this.location.y = this.canvas.height + this.size
        }
        if (this.location.x > this.canvas.width + this.size) {
            this.location.x = this.size
        }
        if (this.location.x < -this.size) {
            this.location.x = this.canvas.width + this.size
        }
    },
    updateHeading(angle){
        this.heading+= angle
    },
    draw() {
        this.ctx.save();
        this.ctx.translate(this.location.x, this.location.y)
        this.ctx.rotate(this.heading);
        this.ctx.beginPath()
        this.ctx.moveTo(0, this.size / 2)
        this.ctx.lineTo(this.size / 2, this.size * 1.5);
        this.ctx.lineTo(-this.size / 2, (this.size * 1.5));
        this.ctx.closePath()
        this.ctx.stroke()

        this.ctx.restore()

    },
}
export default ship