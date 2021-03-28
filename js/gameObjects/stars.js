import GameObject from '../gameObject.js'

export default class Star extends GameObject {
    constructor() {
        super()
    }

    nextSize() {
        if (this.radius === this.orgRadius || this.radius === 0) {
            this.increment = this.increment * -1
        } 
        return this.radius += this.increment
    }

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    static offsetStar(x, y, fracX, fracY) {
        fracY = fracY * 2
        fracX = fracX * 2

        let randX = this.getRandomInt(0, 3)
        if (randX === 0) {
            x = x + 0
        } else if (randX === 1) {
            x = x - fracX
        } else {
            x = x + fracX
        }

        let randY = this.getRandomInt(0, 3)
        if (randX === 0) {
            y = y + 0
        } else if (randY === 1) {
            y = y - fracY
        } else {
            y = y + fracY
        }

        return [x, y]
    }

    static determineStarSize() {
        return this.getRandomInt(1, 4)
    }    
}