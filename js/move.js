import Enemy from './gameObjects/enemy.js'
import Rocket from './gameObjects/rocket.js'
import Planet from './gameObjects/planet.js'
import Bullet from './gameObjects/bullet.js'
import { angelToSlope, mapDiameter, mapRadius } from './gameUtils.js'
import Controller from './controller.js'
import EnemyParticle from './gameObjects/enemyParticle.js'

export default class Move {
    constructor(enemies, rocket, planets, bullets, enemyParticles) {

        //////////////////////////////////////
        /////Rocket Movement Button Setup/////
        //////////////////////////////////////
        
        this.controller = new Controller(bullets, rocket)
        this.ROTATE_SPEED = 3;

        this.canvasEle = document.querySelector('#game-window-container');
        this.canvasEleMarginT = 0
        this.canvasEleMarginL = 0


        // this.mapDiameter = 812 * 1.5;
        // this.width = 812
        // this.height = 375;

        this.rocket = rocket
        this.bullets = bullets
        this.objectsToMove = [enemies, [rocket], planets, bullets, enemyParticles]
        
        this.FRAME = 1
    }

    move() {
        this.FRAME = (this.FRAME === 60) ? 0 : ++this.FRAME
        this.objectsToMove.forEach(objectArr => {
            objectArr.forEach(object => {

                if (object instanceof Enemy) {
                    this.moveEnemy(object)
                } else if (object instanceof Rocket) {
                    this.moveRocket(object)
                } else if (object instanceof Planet) {
                    this.movePlanet(object)
                } else if (object instanceof Bullet) {
                    this.moveBullet(object)
                } else if (object instanceof EnemyParticle) {
                    this.moveEnemyParticle(object)
                }
            })
        })
    }

    moveEnemyParticle(enemyParticle) {
        enemyParticle.x += enemyParticle.velX
        enemyParticle.y += enemyParticle.velY
    }

    moveEnemy(enemy) {
        // let distanceOfCirFromCenter = Math.sqrt((this.mapRadius - enemy.x - enemy.size / 2) ** 2 + (this.mapRadius - enemy.y - enemy.size / 2) ** 2)

        // // if wall collision occures, travel slope is changed 45 degrees
        // if (distanceOfCirFromCenter > this.mapRadius - (enemy.size / 2)) {
            //     enemy.degree = (enemy.degree + 45) % 360
            //     Enemy.setVelXandY(enemy)
            // }
            
            // updated position of enemy
        enemy.x += enemy.velX
        enemy.y += enemy.velY
    }
        
    moveBullet(bullet) {
        // console.log(bullet)
        bullet.x += bullet.velX
        bullet.y += bullet.velY
    }

    ///////////////////////////
    //////Rocket Movement//////
    ///////////////////////////
    moveRocket(rocket) {     
        this.rotateShip(rocket)
        
        if (rocket.noWallContact) {
            rocket.x += rocket.velX
            rocket.y += rocket.velY
            rocket.centerY += rocket.velX
            rocket.centerX += rocket.velY
            // console.log(this.canvasEle)

            this.canvasEleMarginT -= rocket.velY * 2;
            this.canvasEleMarginL -= rocket.velX * 2;

            this.canvasEle.style.marginTop = `${this.canvasEleMarginT}px`
            this.canvasEle.style.marginLeft = `${this.canvasEleMarginL}px`
            //move map
            
        }
             
    }
    
    rotateShip(rocket) {
        for (let i = 0; i < this.ROTATE_SPEED; i++) {
            if (this.controller.touchDownR) {
                // console.log('hellloo')            
                (rocket.degree + 1 > 359) ? rocket.degree = 0 : rocket.degree += 1
            }
            if (this.controller.touchDownL) {
                (rocket.degree === 0) ? rocket.degree = 359 : rocket.degree -= 1
            }
            // rocket.quadControlPoint = rocket.positionX - rocket.positionY
        }
        Rocket.setVelXandY(rocket);
    }




    movePlanet(planet) {
        //focus on eye movement now.
    var mouseX = this.rocket.centerY - 8 - planet.x;
    var mouseY = this.rocket.centerX - 8 - planet.eyeYPosition;
    // console.log(this.offsetTop)
    // console.log('hello')
    // console.log(mouseX)
    // console.log(mouseY)
    // console.log('hello', planet.eyeYPosition, planet.x)

    var ratioX = Math.abs(mouseX) / (Math.abs(mouseX) + Math.abs(mouseY));
    var ratioY = Math.abs(mouseY) / (Math.abs(mouseX) + Math.abs(mouseY));


    if (mouseX > 0) {
        planet.reyedxafter = planet.reyedx + (ratioX * planet.eyesgap);
    } else {
        planet.reyedxafter = planet.reyedx - (ratioX * planet.eyesgap);
    }

    if (mouseY > 0) {
        planet.reyedyafter = planet.reyedy + (ratioY * planet.eyesgap);
    } else {
        planet.reyedyafter = planet.reyedy - (ratioY * planet.eyesgap);
    }

    if (mouseX > 0) {
        planet.leyedxafter = planet.leyedx + (ratioX * planet.eyesgap);
    } else {
        planet.leyedxafter = planet.leyedx - (ratioX * planet.eyesgap);
    }

    if (mouseY > 0) {
        planet.leyedyafter = planet.leyedy + (ratioY * planet.eyesgap);
    } else {
        planet.leyedyafter = planet.leyedy - (ratioY * planet.eyesgap);
    }
    }


}