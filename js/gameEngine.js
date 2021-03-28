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

        })
    }

    checkGameState() {
        loop()
    }

    loop() {
        this.display.render()
        // requestAnimationFrame(this.checkGameState.bind(this))
    }



}