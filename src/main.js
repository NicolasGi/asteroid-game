import Meteor from "./Meteor";
import ship from "./ship";
import collisionDetector from "./collisionDetector";
import garbageManager from "./garbageManager";

const animation = {
    canvas:null,
    ctx:null,
    count:4,
    meteors:[],
    request:null,

    init(){
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.resizeCanvas()
        this.ctx.strokeStyle = '#fff'
        this.ctx.fillStyle = '#fff'


        for(let i=0; i<this.count; i++) {
            this.meteors.push(new Meteor(this))
        }

        ship.init(this.canvas, this.ctx)
        this.animate()
    },
    resizeCanvas(){
        this.canvas.width = 640;
        this.canvas.height = 480;
    },

    animate(){
        window.requestAnimationFrame(()=>{
            this.animate()
        })
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ship.update()
        ship.bullets.forEach((bullet)=>{
            bullet.update()
        })
        this.meteors.forEach((meteor)=>{
            meteor.update()
        })
        if(ship.bullets && this.meteors){
            const collidingPair = collisionDetector.detect(this.ctx, ship, this.meteors )
            if(collidingPair){
                garbageManager.remove(collidingPair.bullet, ship.bullets)
                garbageManager.remove(collidingPair.meteor, this.meteors)
            }
        }
    }

};
animation.init();
