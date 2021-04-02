import { angelToSlope, oneFrac } from './gameUtils.js'
let levels = null
export default levels = [
    [

        [ // level 1 array, contains enemies at index: 0, and planets at index: 1

            {
                x: 700,
                y: 350,
                degree: 10,
                cirRad: 40,
                color: 'rgba(255, 0, 255, 1)',
                imageSrc: './img/pink-enemy.png'
            },
            {
                x: 190,
                y: 190,
                degree: 70,
                cirRad: 55,
                color: 'rgba(0, 255, 0, 1)',
                imageSrc: './img/green-enemy.png'
            },
            {
                x: 200,
                y: 230,
                degree: 180,
                cirRad: 70,
                color: 'rgba(0, 0, 255, 1)',
                imageSrc: './img/black-enemy.png'
            },
        ],
        [
            {
                x: 150,
                y: 300,
                velX: 5,
                velY: 5,
                height: 150,
                width: 150,
                color: 'rgba(230, 0, 255, 1)',
                imageSrc: './img/purple-planet.png'
            },
            {
                x: 350,
                y: 600,
                velX: 5,
                velY: 5,
                height: 200,
                width: 200,
                color: 'rgba(0, 0, 255, 1)',
                imageSrc: './img/blue-planet.png'
            },
            {
                x: 700,
                y: 200,
                velX: 5,
                velY: 5,
                height: 120, 
                width: 150,
                color: 'rgba(255, 106, 0, 1)',
                imageSrc: './img/orange-planet.png'
            }
        ]
    ]
]