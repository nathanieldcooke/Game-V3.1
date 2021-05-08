import statusPanel from './statusPanel.js'
import healthBar from './healthBar.js'
import GameEngine from './gameEngine.js'

export default class Regulator {
    constructor() {
        this.gameE = new GameEngine;
        this.buttonDiv = document.querySelector('.press-enter-div')
    }

    healthBarCheck() {
        // console.log(healthBar.health)
        // console.log(statusPanel.lives)
        if (healthBar.health === 0 && statusPanel.lives === 0) {
            this.gameOver()
            this.buttonDiv.classList.remove('hidden')
        } else if (healthBar.health === 0) {
            this.startLevelOver()
        }
    }

    enemiesCheck(enemies) {
        if (!enemies.length) {
            this.gameOver()
            this.buttonDiv.classList.remove('hidden')
        }
    }

    gameOver() {
        this.gameE.levelNum = 0
        this.gameE.setGame()
        healthBar.healthBarReset()
        statusPanel.resetStatusPanel()
        // let audioBullet = document.getElementById('bullet-sound')
        // document.body.removeChild(audioBullet);
    }
    
    startLevelOver() {
        this.gameE.setGame()
        healthBar.healthBarReset()
        statusPanel.decrementLives()
    }

    nextLevel() {

    }

}
