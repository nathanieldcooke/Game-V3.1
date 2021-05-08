import Bullet from './gameObjects/bullet.js'
import Sound from './sound.js'
import { onePercent } from './gameUtils.js';

export default class Controller {
    constructor (bullets, rocket) {
        // this.rightButton = document.getElementById('right-button');
        // this.leftButton = document.getElementById('left-button');

        // this.bulletButton = document.getElementById('shoot-button');



        // this.rightButton.addEventListener('touchstart', this.rightClickDownAction);
        // this.rightButton.addEventListener('touchend', this.rightClickUpAction);
        // this.leftButton.addEventListener('touchstart', this.leftClickDownAction);
        // this.leftButton.addEventListener('touchend', this.leftClickUpAction);

        document.addEventListener('keydown', this.keyDownEvent)
        document.addEventListener('keyup', this.keyUpEvent)

        // doc.addEventListener('touchstart', this.fireBullet.bind(this));


        this.touchDownR = false;
        this.touchDownL = false;
        this.play = false;

        this.bullets = bullets
        this.rocket = rocket
        // console.log(this.rocket)
        // this.shoot = new Sound('./sound/shoot.wav')
        // this.backgoundSound = backgoundSound
        // this.backgoundSound.sound.loop = true;
    }

    keyDownEvent = async (e) => {
        let code = e.keyCode
        if (code === 39) {
            this.touchDownR = true;
            this.touchDownL = false;
        } else if (code === 37) {
            this.touchDownL = true
            this.touchDownR = false
        } else if (code === 32) {

            // try{
            // let audioBullet = document.getElementById('bullet-sound')

            // if (audioBullet) {
            //     // audioBullet.pause()
            //     document.body.removeChild(audioBullet);
            // }
            // this.shoot.currentTime = 0;
            // this.shoot.play();
            // // } catch(err) {
            //     console.log(err)
            // }
            // console.log(audioBullet)
            // if (audioBullet.length) {
                // Array.from(audioBullets).forEach(audioBullet => {
                    // document.body.removeChild(audioBullet);
                // })
            // }
            let bullet = new Bullet();
            bullet.x = this.rocket.x;
            bullet.y = this.rocket.y;
            bullet.size = .3 * onePercent;
            bullet.degree = this.rocket.degree;
            Bullet.setVelXandY(bullet);
            this.rocket.velX * onePercent;
            this.rocket.velY * onePercent;
            this.bullets.push(bullet);
        } else if (code === 13) {
            if (this.play) {
                this.play = false;
                // this.backgoundSound.stop();
            } else {
                this.play = true;
                // this.backgoundSound.play();
            }
        }
    }

    keyUpEvent = (e) => {
        let code = e.keyCode
        if (code === 39) {
            this.touchDownR = false;
        } else if (code === 37) {
            this.touchDownL = false;
        }
    }


    // rightClickDownAction = (e) => {
    //     this.touchDownR = true;
    // }

    // rightClickUpAction = (e) => {
    //     this.touchDownR = false;
    // }

    // leftClickDownAction = (e) => {
    //     this.touchDownL = true;
    // }

    // leftClickUpAction = (e) => {
    //     this.touchDownL = false;
    // }

    // fireBullet() {
    //     let bullet = new Bullet();
    //     // console.log(this.rocket, 'here')
    //     bullet.x = this.rocket.x;
    //     bullet.y = this.rocket.y;
    //     bullet.size = .3 * onePercent;
    //     bullet.degree = this.rocket.degree;
    //     Bullet.setVelXandY(bullet);
    //     this.rocket.velX * onePercent;
    //     this.rocket.velY * onePercent;

    //     this.bullets.push(bullet);
    //     // console.log(this.bullets)
    // }


}