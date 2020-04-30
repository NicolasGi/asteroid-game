const collisionDetector = {
    detect(ctx, ship, meteors){
        for(let i = 0; i < ship.bullets.length; i++){
            for(let j = 0; j < meteors.length; j++) {
                if (ctx.isPointInPath(
                    meteors[j].path,
                    ship.bullets[i].location.x - meteors[j].location.x,
                    ship.bullets[i].location.y - meteors[j].location.y)) {
                    return {bullet: ship.bullets[i], meteor : meteors[j]}
                }
            }
        }
        return false;
    }
}
export default collisionDetector