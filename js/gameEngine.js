import Move from './move.js'
import Display from './display.js'
import Enemy from './gameObjects/enemy.js'
import Rocket from './gameObjects/rocket.js'
import levels from './levels.js'
import Planet from './gameObjects/planet.js'
import Star from './gameObjects/stars.js'
import Collision from './collision.js'
import { mapDiameter, mapRadius, oneFrac } from './gameUtils.js'

// import image from './image.js'

export default class GameEngine {
    constructor(levelNum = 0) {
  
        this.levelNum = levelNum;
        this.start();
        this.count = 0


    }

    start() {
        this.generateEnemies()
        this.generatePlanets()
        this.generateStarField()
        this.generateRocket()
        this.move = new Move(this.enemies, this.rocket, this.planets);
        this.display = new Display(this.enemies, this.planets, this.stars, this.rocket);
        this.collision = new Collision(this.enemies, this.planets, this.stars, this.rocket)
        this.loop()
    }

    generateEnemies() {
        // console.log(levels[this.levelNum])
        this.enemies = [];
        const currlevel = levels[this.levelNum][0]
        currlevel.forEach(enemy => {
            let enemyInst = new Enemy()
                enemyInst.x = enemy.x * oneFrac; // this.x = x;
                enemyInst.y = enemy.y * oneFrac; // this.y = y;
                enemyInst.degree = enemy.degree;
                Enemy.setVelXandY(enemyInst);
                // console.log('VX:' + enemyInst.velX)
                // console.log('VY:' + enemyInst.velY)

                // enemyInst.velX = enemy.velX; // this.velx = velx;
                // enemyInst.velY = enemy.velY;  // this.vely = vely;
                enemyInst.size = enemy.cirRad; // this.size = size;
                enemyInst.color = enemy.color; // this.color = color;
                enemyInst.img = new Image();
                enemyInst.img.src = enemy.imageSrc;
                this.enemies.push(enemyInst)
        })
    }

    generatePlanets() {
        // console.log(levels[this.levelNum])
        this.planets = [];
        const currlevel = levels[this.levelNum][1]
        currlevel.forEach(planet => {
            let planetInst = new Planet()
            planetInst.x = planet.x * oneFrac; // this.x = x;
            planetInst.y = planet.y * oneFrac; // this.y = y;
            planetInst.velX = planet.velX; // this.velx = velx;
            planetInst.velY = planet.velY;  // this.vely = vely;
            planetInst.width = planet.width; // this.size = size;
            planetInst.height = planet.height; // this.size = size;
            planetInst.color = planet.color; // this.color = color;
            planetInst.img = new Image();
            planetInst.img.src = planet.imageSrc;


            // planet eyes
            planetInst.radiusEyeIn = 3; // controls puple size

            planetInst.eyeYPosition = planetInst.y - 80; // controlls eyes vertical position relative to face

            planetInst.reyedx = planetInst.x + (planetInst.radiusEyeIn / 2) + 14 // controls postion of right puple
            planetInst.reyedy = planetInst.eyeYPosition

            planetInst.leyedx = planetInst.x - (planetInst.radiusEyeIn / 2) - 14 // controls postion of left puple
            planetInst.leyedy = planetInst.eyeYPosition

            
            planetInst.eyesgap = 4; // controls how off center the puples eye trackiing is
            
            planetInst.reyedxafter = planetInst.reyedx;
            planetInst.reyedyafter = planetInst.reyedy;
            
            planetInst.leyedxafter = planetInst.leyedx;
            console.log(planetInst.leyedx)
            console.log(planetInst.reyedx)
            planetInst.leyedyafter = planetInst.leyedy;

            this.planets.push(planetInst)
        })
    }

    generateStarField() {
        let fracOfWidth = mapDiameter / 300;
        let fracOfHeight = mapDiameter / 300;
        this.stars = [];
        for(let i = 5; i <= 300; i += 7) {
            for(let j = 5; j <= 300; j += 7) {
                let currX = fracOfWidth * j
                let currY = fracOfHeight * i

                
                if (Math.sqrt((mapRadius - currX) ** 2 + (mapRadius - currY) ** 2) > mapRadius) continue;
                let star = new Star
                // star.increment = 4.25;
                let offsets = Star.offsetStar(currX, currY, fracOfWidth, fracOfHeight)
                star.x = offsets[0]
                star.y = offsets[1];
                star.velX = 0;
                star.velY = 0;
                star.flicker = Star.willFlicker();
                star.increment = 1;
                star.radius = Star.determineStarSize();
                star.brightness = Star.startBrightness();
                star.color = `rgba(255, 255, 255, ${star.brightness})`;
                this.stars.push(star);
            }
        }
    }

    generateRocket() {

        // this.mapDiameter = 812 * 1.5;
        // this.mapRadius = this.mapDiameter / 2

        // sets rocket
        this.rocket = new Rocket();
        this.rocket.y = mapRadius;
        this.rocket.x = mapRadius;
        this.rocket.width = 80;
        this.rocket.height = 100;
        this.rocket.centerX = this.rocket.x - this.rocket.width / 2;
        this.rocket.centerY = this.rocket.y - this.rocket.width / 2;
        this.rocket.noWallContact = true;
        this.rocket.degree = 0;
        Rocket.setVelXandY(this.rocket);
        this.rocket.img = new Image();
        this.rocket.img.src = './img/new-rocket-cut.png';
    }

    checkGameState() {
        this.loop();
    }

    loop() {
        this.count++
        this.display.render()
        this.collision.checkForCollisions()
        this.move.move()
        requestAnimationFrame(this.checkGameState.bind(this))
    }



}