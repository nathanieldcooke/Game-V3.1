import Move from './move.js'
import Display from './display.js'
import Radar from './radar.js'
import Enemy from './gameObjects/enemy.js'
import Rocket from './gameObjects/rocket.js'
import levels from './levels.js'
import Planet from './gameObjects/planet.js'
import Star from './gameObjects/stars.js'
import Collision from './collision.js'
// import Sound from './sound.js'
import { mapDiameter, mapRadius, onePercent } from './gameUtils.js'
import regulator from '../index.js'

// import image from './image.js'

export default class GameEngine {
    constructor(levelNum = 0) {
  
        this.levelNum = levelNum;

        this.setGame()
        this.loop();
        this.count = 0;
        this.buttonDiv = document.querySelector('.press-enter-div')
    }

    setGame() {
        let audioEles = document.getElementsByTagName('audio')
        // Array.from(audioEles).forEach(audioEle => {
        //     audioEle.pause()
        //     document.body.removeChild(audioEle)
        // })
        this.generateEnemies()
        this.generatePlanets()
        this.generateStarField()
        this.generateRocket()
        this.enemyParticles = [];
        this.bullets = []
        // this.backgoundSound = new Sound('./sound/background.wav')
        this.move = new Move(this.enemies, this.rocket, this.planets, this.bullets, this.enemyParticles);
        this.display = new Display(this.enemies, this.planets, this.stars, this.rocket, this.bullets, this.enemyParticles);
        this.displayRadar = new Radar(this.enemies, this.planets, this.rocket)
        this.collision = new Collision(this.enemies, this.planets, this.stars, this.rocket, this.bullets, this.enemyParticles)
    }

    start() {
        this.loop()
    }

    generateEnemies() {
        // console.log(levels[this.levelNum])
        this.enemies = [];
        const currlevel = levels[this.levelNum][0]
        currlevel.forEach(enemy => {
            let enemyInst = new Enemy()
                enemyInst.x = enemy.x * onePercent; // this.x = x;
                enemyInst.y = enemy.y * onePercent; // this.y = y;
                enemyInst.degree = enemy.degree;
                Enemy.setVelXandY(enemyInst);
                enemyInst.velX *= onePercent / 10;
                enemyInst.velY *= onePercent / 10;
                // console.log('VX:' + enemyInst.velX)
                // console.log('VY:' + enemyInst.velY)

                // enemyInst.velX = enemy.velX; // this.velx = velx;
                // enemyInst.velY = enemy.velY;  // this.vely = vely;
                enemyInst.size = enemy.cirRad * onePercent; // this.size = size;
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
            planetInst.x = planet.x * onePercent ; // this.x = x;
            planetInst.y = planet.y * onePercent ; // this.y = y;
            planetInst.velX = planet.velX * onePercent; // this.velx = velx;
            planetInst.velY = planet.velY * onePercent;  // this.vely = vely;
            planetInst.width = planet.width * onePercent; // this.size = size;
            planetInst.height = planet.height * onePercent; // this.size = size;
            planetInst.centerX = planetInst.x + planetInst.width / 2;
            planetInst.centerY = planetInst.y + planetInst.width / 2;
            planetInst.color = planet.color; // this.color = color;
            planetInst.img = new Image();
            planetInst.img.src = planet.imageSrc;


            // planet eyes
            planetInst.radiusEyeIn = onePercent / planet.radiusEyeIn ; // controls puple size
                                                    //-10
            planetInst.eyeYPosition = planetInst.centerY - onePercent * planet.eyeYPosition; // controlls eyes vertical position relative to face
            // console.log(planetInst.centerX)
            planetInst.reyedx = planetInst.centerX + (planetInst.radiusEyeIn / 2) + onePercent * planet.rAndLEyePos; // controls postion of right puple
            planetInst.reyedy = planetInst.eyeYPosition ;

            planetInst.leyedx = planetInst.centerX - (planetInst.radiusEyeIn / 2) - onePercent * planet.rAndLEyePos; // controls postion of left puple
            planetInst.leyedy = planetInst.eyeYPosition ;

            
            planetInst.eyesgap = onePercent / planet.eyesgap; // controls how off center the puples eye trackiing is
            
            planetInst.reyedxafter = planetInst.reyedx ;
            planetInst.reyedyafter = planetInst.reyedy ;
            
            planetInst.leyedxafter = planetInst.leyedx ;
            planetInst.leyedyafter = planetInst.leyedy ;
            // console.log(planetInst.leyedx)
            // console.log(planetInst.reyedx)

            this.planets.push(planetInst)
        })
    }

    generateStarField() {
        let fracOfWidth = mapDiameter / 300;
        let fracOfHeight = mapDiameter / 300;
        this.stars = [];
        for(let i = 5; i <= 300; i += 14) {
            for(let j = 5; j <= 300; j += 14) {
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
        this.rocket.width = 3 * onePercent;
        this.rocket.height = 5 * onePercent;
        this.rocket.centerX = this.rocket.x - this.rocket.width / 2;
        this.rocket.centerY = this.rocket.y - this.rocket.width / 2;
        this.rocket.noWallContact = true;
        this.rocket.noPlanetContact = true;
        this.rocket.degree = 0;
        Rocket.setVelXandY(this.rocket);
        this.rocket.velX * onePercent;
        this.rocket.velY * onePercent;
        this.rocket.img = new Image();
        this.rocket.img.src = './img/new-rocket-cut.png';
    }

    checkGameState() {
        regulator.healthBarCheck()
        regulator.enemiesCheck(this.enemies)
        // if (this.move.controller.play)
        this.loop();
    }

    loop() {
        if (this.move.controller.play) {
            this.display.render()
            this.displayRadar.render()
            this.collision.checkForCollisions()
            this.move.move()
            this.buttonDiv?.classList.add('hidden')
        } else {
            this.buttonDiv?.classList.remove('hidden')
        }
        requestAnimationFrame(this.checkGameState.bind(this))
    }

}