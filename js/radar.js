import Enemy from './gameObjects/enemy.js'
import Planet from './gameObjects/planet.js'
import Star from './gameObjects/stars.js'
import Rocket from './gameObjects/rocket.js'
import { mapDiameter, mapRadius } from './gameUtils.js'
import Bullet from './gameObjects/bullet.js'


export default class Radar {
    constructor(enemies, planets, rocket) {
        // gets HTML canvas element that will display the game
        this.canvas = document.getElementById('radar-canvas');


        // this.mapDiameter = 812 * 1.5;
        // console.log(this.mapDiameter)
        // sets height and width of canvas element to screen size
        // this.canvas.width = this.width;
        // this.canvas.height = this.height;
        this.canvas.width = mapDiameter;
        this.canvas.height = mapDiameter;
        // will set the context of the canvas element to 2d, and provide 
        // properties that come with canvas
        this.ctx = this.canvas.getContext('2d');

        // gives display access to elments to be displayed
        this.objectsToRender = [enemies, planets, [rocket]];

        this.FRAME = 1
    }

    render() {
        this.FRAME = (this.FRAME === 60) ? 0 : ++this.FRAME


        /// Draws containeing circle
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        this.ctx.beginPath();
        this.ctx.arc(mapRadius, mapRadius, mapRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "rgba(0,0,0,0)";
        this.ctx.fill();
        this.ctx.stroke();


        /// Old Stuff to Hand on for now
        // this.ctx.fillStyle = 'rgba(0,0,0, 1)'
        // // this.ctx.shadowBlur = 0
        // this.ctx.fillRect(0, 0, this.width, this.height)



        this.objectsToRender.forEach(objectArr => {
            objectArr.forEach(object => {
                if (object instanceof Enemy) {
                    this.renderEnemy(object);
                } else if (object instanceof Planet) {
                    this.renderPlanet(object);
                } else if (object instanceof Rocket) {
                    this.renderRocket(object);
                }
            })
        })
    }

    renderEnemy(enemy) {
        this.ctx.beginPath();
        this.ctx.shadowBlur = enemy.size * 1.5;
        this.ctx.shadowColor = enemy.color;
        this.ctx.fillStyle = enemy.color;

        this.ctx.stroke();

        this.ctx.beginPath()
        this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.size, enemy.size);

        this.ctx.fill()
        this.ctx.shadowBlur = 0;
        this.ctx.stroke()
    }

    renderPlanet(planet) {
        this.ctx.beginPath();
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = planet.color;
        this.ctx.fillStyle = planet.color;
        this.ctx.drawImage(planet.img, planet.x, planet.y, planet.width, planet.height);
        this.ctx.fill()
        this.ctx.shadowBlur = 0;
        this.ctx.stroke()


        //eyes

        // console.log(planet.reyedxafter, planet.reyedyafter, planet.radiusEyeIn)
        // draws right puple
        this.ctx.beginPath();
        this.ctx.arc(planet.reyedxafter, planet.reyedyafter, planet.radiusEyeIn, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.fill();
        this.ctx.stroke()

        // draws left puple
        this.ctx.beginPath();
        this.ctx.arc(planet.leyedxafter, planet.leyedyafter, planet.radiusEyeIn, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.fill();
        this.ctx.stroke()
    }

    renderRocket(rocket) {
        this.ctx.save();
        this.ctx.translate(rocket.x, rocket.y);
        this.ctx.rotate(rocket.degree * Math.PI / 180);
        this.ctx.translate(-rocket.x, -rocket.y);
        // this.ctx.translate(-this.positionX * this.scale, -this.positionY * this.scale);
        this.ctx.drawImage(rocket.img, rocket.centerY, rocket.centerX, rocket.width, rocket.height);
        this.ctx.restore()
    }
}