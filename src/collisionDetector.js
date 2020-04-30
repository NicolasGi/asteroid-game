const collisionDetector = {
    detectBulletMeteorCollision(ctx, ship, meteors) {
        for (let i = 0; i < ship.bullets.length; i++) {
            for (let j = 0; j < meteors.length; j++) {
                if (ctx.isPointInPath(
                    meteors[j].path,
                    ship.bullets[i].location.x - meteors[j].location.x,
                    ship.bullets[i].location.y - meteors[j].location.y)) {
                    return {bullet: ship.bullets[i], meteor: meteors[j]}
                }
            }
        }
        return false;
    },
    detectShipMeteorCollision(ctx, ship, meteors) {
        for (let j = 0; j < meteors.length; j++) {
            for (let i = 0; i < ship.shape.length; i++) {
                if (ctx.isPointInPath(
                    meteors[j].path,
                    ship.location.x - ship.shape[i] - meteors[j].location.x,
                    ship.location.y - ship.shape[i + 1] - meteors[j].location.y)) {
                    return true;
                }
            }
        }
        return false
    }
}
export default collisionDetector