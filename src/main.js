import Meteor from "./Meteor";
import SpaceShip from "./Ship";
import controller from "./controller";

const animation = {
    canvas:null,
    ctx:null,
    count:0,
    meteor:[],
    spaceShip:null,
    request:null,
    init(){
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.resizeCanvas()
        controller.init(this)

        for(let i=0; i<this.count; i++) {
            this.meteor.push(new Meteor(this))
        }

        this.spaceShip = new SpaceShip(this);
        this.draw()
        this.animate()
    },
    resizeCanvas(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for(let i=0; i<this.count; i++){
            this.meteor[i].init()
            this.meteor[i].updateCoordinate()
        }
        this.spaceShip.init()

    },
    animate(){
        this.draw()
        this.request = window.requestAnimationFrame(()=>{
            this.animate()

        })

    },
    moveToDown(){
        this.spaceShip.coordinateY += 10;
    },
    moveToUp(){
        this.spaceShip.coordinateY -= 10;
    },
    moveToLeft(){
        this.spaceShip.coordinateX -= 10;
    },
    moveToRight(){
        this.spaceShip.coordinateX += 10;
    }

};
animation.init();
/*
let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
let cw=canvas.width;
let ch=canvas.height;

let sideCount=3;
let size=40;
let centerX=50;
let centerY=50;
let strokeWidth=4;
let strokeColor='purple';
let fillColor='skyblue';
let rotationDegrees=0;



drawPolygon(centerX,centerY,sideCount,size,strokeWidth,strokeColor,fillColor,rotationDegrees);

function drawPolygon(centerX,centerY,sideCount,size,strokeWidth,strokeColor,fillColor,rotationDegrees){
    let radians=rotationDegrees*Math.PI/180;
    ctx.translate(centerX,centerY);
    ctx.rotate(radians);
    ctx.beginPath();
    //ctx.moveTo (size * Math.cos(0), size * Math.sin(0));
    for (let i = 1; i <= sideCount;i += 1) {
        ctx.lineTo (size * Math.cos(i * 2 * Math.PI / sideCount), size * Math.sin(i * 2 * Math.PI / sideCount));
    }
    ctx.closePath();
    ctx.fillStyle=fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
    ctx.fill();
    ctx.rotate(-radians);
    //ctx.translate(-centerX,-centerY);
}*/