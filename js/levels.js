import { angelToSlope, onePercent } from './gameUtils.js'
let levels = null
export default levels = [
    [

        [ // level 1 array, contains enemies at index: 0, and planets at index: 1

            {
                x: 70,
                y: 35,
                degree: 10,
                cirRad: 4,
                color: 'rgba(255, 0, 255, 1)',
                imageSrc: './img/pink-enemy.png',
                imagesExp: [
                    './img/pink-enemy-exp-1.png',
                    './img/pink-enemy-exp-2.png',
                    './img/pink-enemy-exp-3.png',
                    './img/pink-enemy-exp-4.png',
                    './img/pink-enemy-exp-5.png',
                    './img/pink-enemy-exp-6.png'
                ]

            },
            {
                x: 19,
                y: 19,
                degree: 70,
                cirRad: 5,
                color: 'rgba(0, 255, 0, 1)',
                imageSrc: './img/green-enemy.png'
            },
            {
                x: 20,
                y: 23,
                degree: 180,
                cirRad: 7,
                color: 'rgba(0, 0, 255, 1)',
                imageSrc: './img/black-enemy.png'
            },
        ],
        [
            {
                x: 15,
                y: 30,
                velX: 5,
                velY: 5,
                height: 10, //15
                width: 10, //15
                color: 'rgba(230, 0, 255, 1)',
                imageSrc: './img/purple-planet.png',
                radiusEyeIn: 3,
                eyeYPosition: 1,
                rAndLEyePos: 1.4, 
                eyesgap: 1.5

            },
            {
                x: 35,
                y: 60,
                velX: 5,
                velY: 5,
                height: 12, //20
                width: 12, //20
                color: 'rgba(0, 0, 255, 1)',
                imageSrc: './img/blue-planet.png',
                radiusEyeIn: 3,
                eyeYPosition: 1.2,
                rAndLEyePos: 1.2,
                eyesgap: 1
            },
            {
                x: 70,
                y: 20,
                velX: 5,
                velY: 5,
                height: 8, //12
                width: 10, //15
                color: 'rgba(255, 106, 0, 1)',
                imageSrc: './img/orange-planet.png',
                radiusEyeIn: 3,
                eyeYPosition: 1.8,
                rAndLEyePos: 1,
                eyesgap: 1.5
            }
        ]
    ]
]