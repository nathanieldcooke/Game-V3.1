export default class Controller {
    constructor () {
        this.rightButton = document.getElementById('right-button');
        this.leftButton = document.getElementById('left-button');

        this.rightButton.addEventListener('touchstart', this.rightClickDownAction);
        this.rightButton.addEventListener('touchend', this.rightClickUpAction);
        this.leftButton.addEventListener('touchstart', this.leftClickDownAction);
        this.leftButton.addEventListener('touchend', this.leftClickUpAction);

        this.touchDownR = false;
        this.touchDownL = false;
    }

    rightClickDownAction = (e) => {
        this.touchDownR = true;
    }

    rightClickUpAction = (e) => {
        this.touchDownR = false;
    }

    leftClickDownAction = (e) => {
        this.touchDownL = true;
    }

    leftClickUpAction = (e) => {
        this.touchDownL = false;
    }
}