import statusPanel from './statusPanel.js'
import healthBar from './healthBar.js'
import GameEngine from './gameEngine.js'

export default class Regulator {
    constructor() {
        this.gameE = new GameEngine;
    }

    healthBarCheck() {
        // console.log(healthBar.health)
        // console.log(statusPanel.lives)
        if (healthBar.health === 0 && statusPanel.lives === 0) {
            this.gameOver()
        } else if (healthBar.health === 0) {
            this.startLevelOver()
        }
    }

    enemiesCheck(enemies) {
        if (!enemies.length) {
            window.alert('NEXT LEVEL!!!')
        }
    }

    gameOver() {
        this.gameE.levelNum = 0
        this.gameE.setGame()
        healthBar.healthBarReset()
        statusPanel.resetStatusPanel()
    }
    
    startLevelOver() {
        this.gameE.setGame()
        healthBar.healthBarReset()
        statusPanel.decrementLives()
    }

    nextLevel() {

    }

}
