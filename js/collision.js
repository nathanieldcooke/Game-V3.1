import Enemy from "./gameObjects/enemy.js";
import Rocket from './gameObjects/rocket.js';
import { angelToSlope, mapDiameter, mapRadius } from './gameUtils.js'


export default class Collision {
    constructor(enemies, planets, stars, rocket) {





        // this.mapDiameter = 812 * 1.5;
        // gives display access to elments to be displayed
        this.enemies = enemies;
        this.planets = planets;
        this.rocket = rocket;
        
        this.FRAME = 1
    }

    checkForCollisions() {
        this.planetToEnemy();
        this.enemyToWall()
        this.rocketToWall();
    }

    planetToEnemy() {
        // console.log(this.enemies)
        // console.log(this.planets)
        this.enemies.forEach(enemy => {
            this.planets.forEach(planet => {
                // if the distance between the planet
                // console.log(planet) 
                let enemyCenterX = enemy.x + enemy.size / 2;
                let enemyCenterY = enemy.y + enemy.size / 2;
                let planetCenterX = planet.x + planet.height / 2
                let planetCenterY = planet.y + planet.height / 2
                let distanceOfCirFromCenter = Math.sqrt((enemyCenterX - planetCenterX) ** 2 + (enemyCenterY - planetCenterY) ** 2)
                // console.log(distanceOfCirFromCenter, enemy.size / 2 + planet.height / 2)
                if (distanceOfCirFromCenter < enemy.size / 2 + planet.height / 2) {
                    enemy.degree = (enemy.degree + 45) % 360
                    Enemy.setVelXandY(enemy)
                }
                //and enemy is less than thier summed raduis
                //a collision has occured 
            })
        })
    }
    enemyToWall() {
        // if wall collision occures, travel slope is changed 45 degrees
        this.enemies.forEach(enemy => {
            let distanceOfCirFromCenter = Math.sqrt((mapRadius - enemy.x - enemy.size / 2) ** 2 + (mapRadius - enemy.y - enemy.size / 2) ** 2)
            if (distanceOfCirFromCenter > mapRadius - (enemy.size / 2)) {
                enemy.degree = (enemy.degree + 45) % 360
                Enemy.setVelXandY(enemy)
            }
        })
    }

    rocketToWall() {
        // if wall collision occures, travel slope is changed 45 degrees
        let distanceOfCirFromCenter = Math.sqrt((mapRadius - (this.rocket.x + this.rocket.velX)) ** 2 +
                                                (mapRadius - (this.rocket.y + this.rocket.velY)) ** 2);
        // console.log("D: " + distanceOfCirFromCenter) // 1600
        // console.log("O: " + (this.mapRadius - (this.rocket.width / 2))) /// 550
        
        if ((distanceOfCirFromCenter > mapRadius) && 
            (distanceOfCirFromCenter > mapRadius)) {
            this.rocket.noWallContact = false;
            return
        } else {
            this.rocket.noWallContact = true;
        }

    }
}