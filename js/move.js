import Enemy from './gameObjects/enemy.js'
import Rocket from './gameObjects/rocket.js'
import { angelToSlope } from './gameUtils.js'

export default class Move {
    constructor(enemies, rocket) {

        //////////////////////////////////////
        /////Rocket Movement Button Setup/////
        //////////////////////////////////////
        this.rightButton = document.getElementById('right-button');
        this.leftButton = document.getElementById('left-button');

        this.rightButton.addEventListener('touchstart', this.rightClickDownAction);
        this.rightButton.addEventListener('touchend', this.rightClickUpAction);
        this.leftButton.addEventListener('touchstart', this.leftClickDownAction);
        this.leftButton.addEventListener('touchend', this.leftClickUpAction);

        this.touchDownR = false;
        this.touchDownL = false;

        this.ROTATE_SPEED = 5;

        this.canvasEle = document.querySelector('#game-window');
        this.canvasEleMarginT = 0
        this.canvasEleMarginL = -200




        // this.width = window.innerWidth;
        // this.height = window.innerHeight;
        this.mapDiameter = 812 * 1.5;
        this.mapRadius = this.mapDiameter / 2
        this.width = 812
        this.height = 375;

        this.objectsToMove = [...enemies, rocket]
        
        this.FRAME = 1
    }

    move() {
        this.FRAME = (this.FRAME === 60) ? 0 : ++this.FRAME
        this.objectsToMove.forEach(object => {
            if (object instanceof Enemy) {
                this.moveEnemy(object)
            } else if (object instanceof Rocket) {
                this.moveRocket(object)
            }
        })
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

            this.canvasEleMarginT -= rocket.velY * 1.25;
            this.canvasEleMarginL -= rocket.velX * 1.25;

            this.canvasEle.style.marginTop = `${this.canvasEleMarginT}px`
            this.canvasEle.style.marginLeft = `${this.canvasEleMarginL}px`
            //move map
            
        }
             
    }
    
    rotateShip(rocket) {
        for (let i = 0; i < this.ROTATE_SPEED; i++) {
            if (this.touchDownR) {
                // console.log('hellloo')            
                (rocket.degree + 1 > 359) ? rocket.degree = 0 : rocket.degree += 1
            }
            if (this.touchDownL) {
                (rocket.degree === 0) ? rocket.degree = 359 : rocket.degree -= 1
            }
            // rocket.quadControlPoint = rocket.positionX - rocket.positionY
        }
        Rocket.setVelXandY(rocket);
    }

    rightClickDownAction = (e) => {
        this.touchDownR = true;
    }

    rightClickUpAction = (e) => {
        this.touchDownR = false;
    }

    leftClickDownAction = (e) => {
        this.touchDownL = true;
    }
                                   
    leftClickUpAction = (e) => {  
        this.touchDownL = false;
    }                             


}