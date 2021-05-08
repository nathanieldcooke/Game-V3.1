export default class Sound {
    constructor(src) {
        this.sound = document.createElement('audio');
        this.sound.src = src;
        if (src === './sound/shoot.wav') {
        //     // let audioBullet = document.getElementById('bullet-sound')
        //     // console.log("HELLOOOOOOOOO", this.sound.src)
            this.sound.setAttribute('id', 'bullet-sound');
        }
        this.sound.setAttribute('preload', 'auto');
        this.sound.setAttribute('controls', 'none');
        this.sound.style.display = 'none';
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        }
        this.stop = function () {
            this.sound.pause();
        }
    }
}