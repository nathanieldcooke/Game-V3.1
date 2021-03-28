import Move from './move.js'
import Display from './display.js'
import Enemy from './gameObjects/enemy.js'
import levels from './levels.js'
import Planet from './gameObjects/planet.js'
import Star from './gameObjects/stars.js'
// import image from './image.js'

export default class GameEngine {
    constructor(levelNum = 0) {
        this.levelNum = levelNum;
        this.start();
    }

    start() {
        this.generateEnemies()
        this.generatePlanets()
        this.generateStarField()
        this.move = new Move(this.enemies);
        this.display = new Display(this.enemies, this.planets, this.stars);
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
                enemyInst.img.src = enemy.imageSrc;
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
            planetInst.img.src = planet.imageSrc;
            this.planets.push(planetInst)
        })
    }

    generateStarField() {
        let fracOfWidth = window.innerWidth / 100;
        let fracOfHeight = window.innerHeight / 100;
        this.stars = [];
        for(let i = 5; i <= 100; i += 10) {
            for(let j = 5; j <= 100; j += 10) {
                let star = new Star
                star.increment = 1;
                let offsets = Star.offsetStar(fracOfWidth * j, fracOfHeight * i, fracOfWidth, fracOfHeight)
                star.x = offsets[0]
                star.y = offsets[1];
                star.velX = 0;
                star.velY = 0;
                star.orgRadius = Star.determineStarSize();
                star.radius = star.orgRadius;
                star.color = 'rgba(255, 255, 255, 1)';
                this.stars.push(star);
            }
        }
    }

    checkGameState() {
        this.loop()
    }

    loop() {
        this.display.render()
        this.move.move()
        requestAnimationFrame(this.checkGameState.bind(this))
    }



}