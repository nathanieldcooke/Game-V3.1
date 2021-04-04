class StatusPanel {
    constructor() {
        this.score = 0;
        this.scoreEle = document.getElementById('score-num');
        this.lives = 3;
        this.livesEle = document.getElementById('lives');
        this.level = 0;
        this.levelEle = document.getElementById('level');
    }

    increaseScore() {
        this.score += 100;
        this.scoreEle.innerText = this.score;
    }
}

const statusPanel = new StatusPanel()

export default statusPanel