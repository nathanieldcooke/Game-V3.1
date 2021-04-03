import { angelToSlope } from './gameUtils.js'

export default class GameObject {
    constructor() {
        // GameObject.TRAVEL_SPEED = .75
    }

    static setVelXandY(enemy) {
        let modDegree = enemy.degree % 90
        let slope = null;
        if (enemy.degree >= 0 && enemy.degree < 90) {
            slope = angelToSlope[`${modDegree}`];
        } else if (enemy.degree >= 90 && enemy.degree < 180) {
            slope = angelToSlope[`${modDegree}`];
            slope = [(-slope[1]), (slope[0])]
        } else if (enemy.degree >= 180 && enemy.degree < 270) {
            slope = angelToSlope[`${modDegree}`];
            slope = [(-slope[0]), (-slope[1])]
        } else {
            slope = angelToSlope[`${modDegree}`];
            slope = [(slope[1]), (-slope[0])]
        }
        enemy.velX = (slope[0] ) * enemy.TRAVEL_SPEED;
        enemy.velY = (slope[1] ) * enemy.TRAVEL_SPEED; 
    }
} 