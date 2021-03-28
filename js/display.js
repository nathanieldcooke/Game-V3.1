import Enemy from './gameObjects/enemy.js'
import Planet from './gameObjects/planet.js'

export default class Display {
    constructor(enemies, planets) {
        // gets HTML canvas element that will display the game
        this.canvas = document.getElementById('game-window');
        // gets height and width of device, for the purpose of sizing canvas
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        // sets height and width of canvas element to screen size
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        // will set the context of the canvas element to 2d, and provide 
        // properties that come with canvas
        this.ctx = this.canvas.getContext('2d');

        // gives display access to elments to be displayed
        this.objectsToRender = [...enemies, ...planets]
    }

    render() {
        this.ctx.fillStyle = 'rgba(0,0,0, .25)'
        this.ctx.shadowBlur = 0
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.objectsToRender.forEach(object => {
            if (object instanceof Enemy) {
                this.renderEnemy(object);
            } else if ( object instanceof Planet) {
                this.renderPlanet(object);
            }
        })
    }
    
    renderEnemy(enemy) {
        this.ctx.beginPath();
        this.ctx.shadowBlur = enemy.size * 3.5;
        this.ctx.shadowColor = enemy.color;

        this.ctx.fillStyle = enemy.color;
        this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.size, enemy.size);
        // })
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
    }


}