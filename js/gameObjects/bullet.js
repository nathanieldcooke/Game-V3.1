import GameObject from '../gameObject.js'


export default class Bullet extends GameObject {
    constructor () {
        super()
        this.TRAVEL_SPEED = 1;
    }
}