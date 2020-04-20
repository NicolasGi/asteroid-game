import Meteor from "./Meteor";
import ship from "./ship";

const animation = {
    canvas:null,
    ctx:null,
    count:4,
    meteor:[],
    request:null,

    init(){
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.ctx.strokeStyle = '#fff'
        this.ctx.fillStyle = '#fff'
        this.resizeCanvas()

        for(let i=0; i<this.count; i++) {
            this.meteor.push(new Meteor(this))
        }

        ship.init(this.canvas, this.ctx)
        this.animate()
    },
    resizeCanvas(){
        this.canvas.width = 640;
        this.canvas.height = 480;
    },
    draw(){
        for(let i=0; i<this.count; i++){
            this.meteor[i].init()
            this.meteor[i].updateCoordinate()
        }

    },
    animate(){
        this.request = window.requestAnimationFrame(()=>{
            this.animate()
        })
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ship.update()
        ship.bullets.forEach((bullet)=>{
            bullet.update()
        })

    }

};
animation.init();
