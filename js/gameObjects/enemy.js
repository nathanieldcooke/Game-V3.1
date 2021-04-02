import GameObject from '../gameObject.js'
import { angelToSlope } from '../gameUtils.js'

export default class Enemy extends GameObject {
    constructor() {
        super()
        this.TRAVEL_SPEED = .5
    }
}