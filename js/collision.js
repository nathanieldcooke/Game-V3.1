class Collision {
    constructor(enemies, planets, stars) {
        // gets height and width of device, for the purpose of sizing canvas
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        // gives display access to elments to be displayed
        this.enemies;
        this.planets;
        
        this.FRAME = 1
    }

    checkForCollisions() {
        this.planetToEnemy();
    }

    planetToEnemy() {
        
    }
}