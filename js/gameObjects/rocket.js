import GameObject from "../gameObject.js"

export default class Rocket extends GameObject {
    constructor() {
        super()
        this.TRAVEL_SPEED = .5
    }
}