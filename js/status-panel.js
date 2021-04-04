class StatusPanel {
    constructor() {
        this.score = 0;
        this.scoreEle = document.getElementById('score-num');
        // this.scoreEle.innerText = 10
        this.lives = 3;
        this.livesEle = document.getElementById('lives');
        this.level = 0;
        this.levelEle = document.getElementById('level');
    }
}