import statusPanel from './statusPanel.js'
import healthBar from './healthBar.js'

class Regulator {
    constructor() {
    }

    healthBarCheck() {
        if (healthBar.health === 0 && statusPanel.lives === 0) {
            window.alert('GAME OVER!!!')
        } else if (healthBar.health === 0) {
            window.alert('LEVEL START OVER!!!')
        }
    }

    enemiesCheck(enemies) {
        if (!enemies.length) {
            window.alert('NEXT LEVEL!!!')
        }
    }

    gameOver() {

    }

    startLevelOver() {
        
    }

    nextLevel() {

    }

}

const regulator = new Regulator;

export default regulator;