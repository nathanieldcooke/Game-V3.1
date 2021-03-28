import Move from './move.js'
import Display from './display.js'
import Enemy from './gameObjects/enemy.js'
import levels from './levels.js'

export default class GameEngine {
    constructor(levelNum = 0) {
        this.levelNum = levelNum;
        this.start();
    }

    start() {
        this.generateEnemies()
        this.move = new Move(this.enemies);
        this.display = new Display(this.enemies);
        this.loop()
    }

    generateEnemies() {
        this.enemies = [];
        const currlevel = levels[this.levelNum]
        currlevel.forEach(enemy => {
            let enemyInst = new Enemy()
                enemyInst.x = enemy.x; // this.x = x;
                enemyInst.y = enemy.y; // this.y = y;
                enemyInst.velX = enemy.velX; // this.velx = velx;
                enemyInst.velY = enemy.velY;  // this.vely = vely;
                enemyInst.size = enemy.cirRad; // this.size = size;
                enemyInst.color = enemy.color; // this.color = color;
                // this.height = height;
                // this.width = width;
                this.enemies.push(enemyInst)
        })
    }

    checkGameState() {
        this.loop()
    }

    loop() {
        this.display.render()
        // requestAnimationFrame(this.checkGameState.bind(this))
    }



}