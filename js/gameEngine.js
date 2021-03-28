import Move from './move.js'
import Display from './display.js'
import Enemy from './gameObjects/enemy.js'
import levels from './levels.js'
import Planet from './gameObjects/planet.js'
// import image from './image.js'

export default class GameEngine {
    constructor(levelNum = 0) {
        this.levelNum = levelNum;
        this.start();
    }

    start() {
        this.generateEnemies()
        this.generatePlanets()
        this.move = new Move(this.enemies);
        this.display = new Display(this.enemies, this.planets);
        this.loop()
    }

    generateEnemies() {
        console.log(levels[this.levelNum])
        this.enemies = [];
        const currlevel = levels[this.levelNum][0]
        currlevel.forEach(enemy => {
            let enemyInst = new Enemy()
                enemyInst.x = enemy.x; // this.x = x;
                enemyInst.y = enemy.y; // this.y = y;
                enemyInst.velX = enemy.velX; // this.velx = velx;
                enemyInst.velY = enemy.velY;  // this.vely = vely;
                enemyInst.size = enemy.cirRad; // this.size = size;
                enemyInst.color = enemy.color; // this.color = color;
                enemyInst.img = new Image();
                // document.getElementsByTagName('body')[0].appendChild(enemyInst.img)
                enemyInst.img.src = enemy.imageSrc;
                // this.height = height;
                // this.width = width;
                this.enemies.push(enemyInst)
        })
    }

    generatePlanets() {
        console.log(levels[this.levelNum])
        this.planets = [];
        const currlevel = levels[this.levelNum][1]
        currlevel.forEach(planet => {
            let planetInst = new Planet()
            planetInst.x = planet.x; // this.x = x;
            planetInst.y = planet.y; // this.y = y;
            planetInst.velX = planet.velX; // this.velx = velx;
            planetInst.velY = planet.velY;  // this.vely = vely;
            planetInst.width = planet.width; // this.size = size;
            planetInst.height = planet.height; // this.size = size;
            planetInst.color = planet.color; // this.color = color;
            planetInst.img = new Image();
            // document.getElementsByTagName('body')[0].appendChild(enemyInst.img)
            planetInst.img.src = planet.imageSrc;
            // this.height = height;
            // this.width = width;
            this.planets.push(planetInst)
        })
    }

    checkGameState() {
        this.loop()
    }

    loop() {
        this.display.render()
        requestAnimationFrame(this.checkGameState.bind(this))
    }



}