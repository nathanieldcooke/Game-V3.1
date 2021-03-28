export default class Display {
    constructor(enemies) {
        // gets HTML canvas element that will display the game
        this.canvas = document.getElementById('game-window');
        // gets height and width of device, for the purpose of sizing canvas
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        // sets height and width of canvas element to screen size
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        // will set the context of the canvas element to 2d, and provide 
        // properties that come with canvas
        this.ctx = this.canvas.getContext('2d');

        // gives display access to elments to be displayed
        this.objectsToRender = [...enemies]
    }

    render() {
        this.ctx.fillStyle = 'rgba(0,0,0, .25)'
        this.ctx.shadowBlur = 0
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.objectsToRender.forEach(object => {
            console.log('hello')
            if (object instanceof Enemy) renderEnemy(object)
        })
    }

    renderEnemy(enemy) {
        // this.updateOrb()
        ctx.beginPath();
        ctx.shadowBlur = this.size * 3.5;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.size * 3.5;
        ctx.shadowColor = this.color;
        // ctx.shadowBlur = 0

        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill()
        ctx.shadowBlur = 0;
    }
}