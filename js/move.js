import Enemy from './gameObjects/enemy.js'

export default class Move {
    constructor(enemies) {

        // this.width = window.innerWidth;
        // this.height = window.innerHeight;
        this.width = 812
        this.height = 375;

        this.objectsToMove = [...enemies]
        
        this.FRAME = 1
    }

    move() {
        this.FRAME = (this.FRAME === 60) ? 0 : ++this.FRAME
        this.objectsToMove.forEach(object => {
            if (object instanceof Enemy) {
                this.moveEnemy(object)
            }
        })
    }

    moveEnemy(enemy) {
        let centerXPos = enemy.x + (enemy.size / 2);
        let centerYPos = enemy.y + (enemy.size / 2);

        if (centerXPos + (enemy.size / 2) >= this.width || centerXPos - (enemy.size / 2) <= 0) {
            enemy.velX = -enemy.velX;
        }

        if (centerYPos + (enemy.size / 2) >= this.height || centerYPos - (enemy.size / 2) <= 0) {
            enemy.velY = -enemy.velY;
        }

        enemy.x += enemy.velX
        enemy.y += enemy.velY
    }

}