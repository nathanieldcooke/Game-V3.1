class HealthBar {
    constructor() {
        this.healthBar = document.getElementById('health-bar')
        this.health = 100
        this.healthBar.style.height = `${this.health}%`
    }

    decrementHealth(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        this.healthBar.style.height = `${this.health}%`
        this.healthBar.style.opacity = 1
        this.currColor()
        setTimeout(() => {
            this.healthBar.style.opacity = .15
        }, 500)
        // console.log('hello')
    }

    healthBarReset() {
        this.health = 100;
        this.healthBar.style.height = `${this.health}%`;
        this.healthBar.style.backgroundColor = 'rgba(35, 229, 84, 1)'
    }

    currColor() {
        if (this.health <= 20) {
            // red
            this.healthBar.style.backgroundColor = 'rgba(252, 27, 27, 1)'
        } else if (this.health <= 40) {
            // orange
            this.healthBar.style.backgroundColor = 'rgba(252, 121, 27, 1)'
        } else if (this.health <= 60) {
            // yellowOrange
            this.healthBar.style.backgroundColor = 'rgba(252, 215, 27, 1)'
        } else if (this.health <= 80) {
            // yellowGreen
            this.healthBar.style.backgroundColor = 'rgba(222, 252, 27, 1)'
        } else {
            // green
            this.healthBar.style.backgroundColor = 'rgba(35, 229, 84, 1)'
        this.healthBar.style.opacity = .15
        }
    }
}

const healthBar = new HealthBar()

// setInterval(healthBar.decrementHealth.bind(healthBar), 100)

export default healthBar 