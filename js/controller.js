import Bullet from './gameObjects/bullet.js'
import { onePercent } from './gameUtils.js';

export default class Controller {
    constructor (bullets, rocket) {
        this.rightButton = document.getElementById('right-button');
        this.leftButton = document.getElementById('left-button');

        this.bulletButton = document.getElementById('shoot-button');



        this.rightButton.addEventListener('touchstart', this.rightClickDownAction);
        this.rightButton.addEventListener('touchend', this.rightClickUpAction);
        this.leftButton.addEventListener('touchstart', this.leftClickDownAction);
        this.leftButton.addEventListener('touchend', this.leftClickUpAction);

        this.bulletButton.addEventListener('touchstart', this.fireBullet.bind(this));


        this.touchDownR = false;
        this.touchDownL = false;

        this.bullets = bullets
        this.rocket = rocket
        // console.log(this.rocket)
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

    fireBullet() {
        let bullet = new Bullet();
        // console.log(this.rocket, 'here')
        bullet.x = this.rocket.x;
        bullet.y = this.rocket.y;
        bullet.size = .3 * onePercent;
        bullet.degree = this.rocket.degree;
        Bullet.setVelXandY(bullet);
        this.rocket.velX * onePercent;
        this.rocket.velY * onePercent;

        this.bullets.push(bullet);
        // console.log(this.bullets)
    }


}