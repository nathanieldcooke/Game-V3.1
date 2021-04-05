import GameObject from '../gameObject.js'

export default class EnemyParticle extends GameObject {
    constructor() {
        super()
    }

    nextState() {
        this.opacity -= .01

        if (this.opacity <= 0) return false;
        return true

    }

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    static generateParticles(enemy) {
        let arrOfParticles = [];
        // get center of enemy
        let enemyCenterX = enemy.x + enemy.size / 2;
        let enemyCenterY = enemy.y + enemy.size / 2;

        for (let i = 0; i < 50; i++) {
            let newParticle = new EnemyParticle()
            //choose random particle start postion using radius of enemy
            newParticle.color = enemy.color;
            let ranX = this.getRandomInt(0, enemy.size / 2);
            let ranY = this.getRandomInt(0, enemy.size / 2);
            newParticle.y = enemyCenterY + ranY;
            newParticle.x = enemyCenterX - ranX;
            // console.log(newParticle.x, newParticle.y)
            newParticle.radius = this.getRandomInt(1, 10)
            newParticle.degree = this.getRandomInt(1, 360)
            newParticle.TRAVEL_SPEED = this.getRandomInt(1, 5) / 10
            EnemyParticle.setVelXandY(newParticle);
            // console.log(newParticle.velY, newParticle.velX)
            newParticle.opacity = this.getRandomInt(5, 10) / 10
            newParticle.incrementor = this.getRandomInt(1, 10) / 10
            arrOfParticles.push(newParticle)
            // console.log(newParticle)
        }
        return arrOfParticles;
    }

    static destroy(enemyParticle, arrOfParticals) {
        arrOfParticals.splice(arrOfParticals.indexOf(enemyParticle, 1))
    }

    
}