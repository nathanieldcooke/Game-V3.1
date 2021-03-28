import Move from './move.js'
import Display from './display.js'
import Enemy from './gameObjects/enemy'


export default class GameEngine {
    constructor() {
        this.move = new Move;
        this.display = new Display;
        this.start();
    }

    start() {
        this.thing = "hello";
    }

}