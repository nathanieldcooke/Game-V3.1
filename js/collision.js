import Enemy from "./gameObjects/enemy.js";
import Rocket from './gameObjects/rocket.js';
import Sound from './sound.js'
import { angelToSlope, mapDiameter, mapRadius } from './gameUtils.js'
import healthBar from './healthBar.js'
import statusPanel from './statusPanel.js'
import EnemyParticle from './gameObjects/enemyParticle.js'


export default class Collision {
    constructor(enemies, planets, stars, rocket, bullets, enemyParticles) {
        // this.mapDiameter = 812 * 1.5;
        // gives display access to elments to be displayed
        this.enemies = enemies;
        this.planets = planets;
        this.rocket = rocket;
        this.bullets = bullets;
        this.enemyParticles = enemyParticles
        this.trashCan = [];
        // this.explosionSound = new Sound('./sound/explosion.wav')

        this.FRAME = 1
    }

    checkForCollisions() {
        this.planetToEnemy();
        this.enemyToWall()
        this.rocketToWall();
        this.bulletToWall();
        this.rocketToPlanet()
        this.rocketToEnemy()
        this.bulletToEnemy()
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

    rocketToPlanet() {

        this.planets.forEach(planet => {
            let distanceOfPlanetCenterFromRocket = 
                Math.sqrt(
                    ((planet.centerX) - (this.rocket.x + this.rocket.velX)) ** 2 +
                    ((planet.centerY) - (this.rocket.y + this.rocket.velY)) ** 2
                );

            if ((planet.width / 2 + this.rocket.width / 2) > (distanceOfPlanetCenterFromRocket)) {
                this.rocket.degree = (this.rocket.degree + 45) % 360
                Enemy.setVelXandY(this.rocket)
                healthBar.decrementHealth(10)
                // window.alert('Hit')
                return
            }
            
        })
    }

    bulletToEnemy() {
        this.enemies.forEach(enemy => {
            this.bullets.forEach(bullet => {
                let distanceOfPlanetCenterFromRocket =
                    Math.sqrt(
                        ((enemy.x + enemy.size / 2) - (bullet.x)) ** 2 +
                        ((enemy.y + enemy.size / 2) - (bullet.y)) ** 2
                    );
                    
                    if ((enemy.size / 2 + bullet.size / 2) > (distanceOfPlanetCenterFromRocket)) {
                        statusPanel.increaseScore()
                        this.enemyParticles.push(...EnemyParticle.generateParticles(enemy))
                        // this.explosionSound.play();

                        this.trashCan.push(enemy)
                    }
            })
        })
        if (this.trashCan.length) this.garbageCollector(this.enemies)
    }

    rocketToEnemy() {
        this.enemies.forEach(enemy => {
            let distanceOfEnemyCenterFromRocket =
                Math.sqrt(
                    ((enemy.x + enemy.size / 2) - (this.rocket.x + this.rocket.velX)) ** 2 +
                    ((enemy.y + enemy.size / 2) - (this.rocket.y + this.rocket.velY)) ** 2
                );
                
            if ((enemy.size / 2 + this.rocket.width / 2) > (distanceOfEnemyCenterFromRocket)) {
                enemy.degree = (enemy.degree + 45) % 360
                Enemy.setVelXandY(enemy)
                healthBar.decrementHealth(.5)
                // window.alert('Hit')
                return
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

    bulletToWall() {
        this.bullets.forEach(bullet => {
            let distanceOfCirFromCenter = Math.sqrt((mapRadius - bullet.x - bullet.size / 2) ** 2 + (mapRadius - bullet.y - bullet.size / 2) ** 2)
            if (distanceOfCirFromCenter > mapRadius - (bullet.size / 2)) {
                this.trashCan.push(bullet)
            }
        })
        if (this.trashCan.length) this.garbageCollector(this.bullets)
    }

    garbageCollector(objectArr) {
        this.trashCan.forEach(object => {
            objectArr.splice(objectArr.indexOf(object), 1);
        });

        this.trashCan.length = 0
    }
}