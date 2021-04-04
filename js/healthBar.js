class HealthBar {
    constructor() {
        this.healthBar = document.getElementById('health-bar')
        this.health = 100
        this.healthBar.style.height = `${this.health}%`
    }

    decrementHealth() {
        this.health -= .5
        this.healthBar.style.height = `${this.health}%`
        this.currColor()
        // console.log('hello')
    }

    currColor() {
        if (this.health <= 20) {
            // red
            this.healthBar.style.backgroundColor = 'rgba(252, 27, 27, .15)'
        } else if (this.health <= 40) {
            // orange
            this.healthBar.style.backgroundColor = 'rgba(252, 121, 27, .15)'
        } else if (this.health <= 60) {
            // yellowOrange
            this.healthBar.style.backgroundColor = 'rgba(252, 215, 27, .15)'
        } else if (this.health <= 80) {
            // yellowGreen
            this.healthBar.style.backgroundColor = 'rgba(222, 252, 27, .15)'
        } else {
            // green
            this.healthBar.style.backgroundColor = 'rgba(35, 229, 84, .15)'
        }
    }
}

const healthBar = new HealthBar()

// setInterval(healthBar.decrementHealth.bind(healthBar), 100)

export default healthBar 