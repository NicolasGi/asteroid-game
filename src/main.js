import Meteor from "./Meteor";
import ship from "./ship";
import collisionDetector from "./collisionDetector";
import garbageManager from "./garbageManager";

const animation = {
    canvas:null,
    ctx:null,
    count:1,
    meteors:[],
    requestId:0,

    init(){
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.resizeCanvas()
        this.ctx.strokeStyle = '#fff'
        this.ctx.fillStyle = '#fff'


        for(let i=0; i<this.count; i++) {
            this.meteors.push(new Meteor(this.canvas, this.ctx))
        }

        ship.init(this.canvas, this.ctx)
        this.animate()
    },
    resizeCanvas(){
        this.canvas.width = 640;
        this.canvas.height = 480;
    },

    animate(){
        this.requestId = window.requestAnimationFrame(()=>{
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
            const collidingPair = collisionDetector.detectBulletMeteorCollision(this.ctx, ship, this.meteors )
            if(collidingPair){
                garbageManager.remove(collidingPair.bullet, ship.bullets)
                if(collidingPair.meteor.size > 4){
                    this.generateSmallMeteor(collidingPair.meteor)
                }
                garbageManager.remove(collidingPair.meteor, this.meteors)
            }
        }
        if(ship && this.meteors){
            if(collisionDetector.detectShipMeteorCollision(this.ctx, ship, this.meteors)){

                window.cancelAnimationFrame(this.requestId)
            }
        }
        },
    generateSmallMeteor(MeteorParent){
        const children = Math.floor(2+Math.random()*3)
        for (let i = 0;i<children;i++){
            this.meteors.push(new Meteor(this.canvas, this.ctx, MeteorParent))
        }
    }

};
animation.init();
