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

    decrementLives() {
        --this.lives;
        let children = this.livesEle.children
        let lastChild = children[children.length - 1];
        this.livesEle.removeChild(lastChild);
    }

    resetStatusPanel() {
        this.score = 0
        this.scoreEle.innerText = this.score

        this.lives = 3
        this.livesEle.innerHTML = `Lives: <img id="space-ship-img-lives" src="./img/new-rocket-cut.png" alt=""> <img
        id = "space-ship-img-lives" src = "./img/new-rocket-cut.png" alt = "" > <img id="space-ship-img-lives"
            src="./img/new-rocket-cut.png" alt=""> </div>`
        
        this.level = 0
        this.levelEle.innerHTML = '0'
    }
}

const statusPanel = new StatusPanel()

export default statusPanel