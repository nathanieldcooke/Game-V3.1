import GameObject from '../gameObject.js'

const floatTranslate = {
    '20': 1,
    '19': .95,
    '18': .9,
    '17': .85,
    '16': .8,
    '15': .75,
    '14': .7,
    '13': .65,
    '12': .6,
    '11': .55,
    '10': .5,
    '9': .45,
    '8': .4,
    '7': .35,
    '6': .3,
    '5': .25,
    '4': .2,
    '3': .15,
    '2': .1,
    '1': .05
}


export default class Star extends GameObject {
    constructor() {
        super()
    }

    currStarBrightness() {
        return floatTranslate[this.brightness]
    }

    nextBrightness() {
        // if (this.brightness < 1) this.brightness = 1
        // if (this.brightness > 10) this.brightness = 10
        if (this.brightness < 1 || this.brightness > 20) {
            this.increment = -(this.increment)
        } 
        // console.log("Curr B: " + this.brightness)
        // console.log("Next I: " + this.increment)
        // console.log("Result: " + ( this.brightness + this.increment))
        this.brightness += this.increment;
        // console.log(res)
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

    static startBrightness() {
        return this.getRandomInt(2, 20);
    }

    static willFlicker() {
        let num = this.getRandomInt(0, 4);
        return (num === 3) ? true : false;
    }
}