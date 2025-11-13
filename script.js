const video = document.getElementById("video");
const soundPicker = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll("#time-select button");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");

let fakeDuration = 600; // default 10 min
let audio = new Audio("Sounds/beach.mp3");

// TIME SELECT BUTTONS
timeButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        fakeDuration = parseInt(this.getAttribute("data-time"));
        let minutes = Math.floor(fakeDuration / 60);
        timeDisplay.textContent = `${minutes}:0`;
    });
});

// SOUND PICKER BUTTONS
soundPicker.forEach(btn => {
    btn.addEventListener("click", function () {

        let soundSrc = this.getAttribute("data-sound");
        let videoSrc = this.getAttribute("data-video");

        audio.src = soundSrc;
        video.src = videoSrc;

        audio.play();
        video.play();

        playButton.textContent = "❚❚";
    });
});

// PLAY / PAUSE BUTTON
playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        video.play();
        playButton.textContent = "❚❚";
    } else {
        audio.pause();
        video.pause();
        playButton.textContent = "►";
    }
});

// TIMER
audio.ontimeupdate = () => {
    let currentTime = audio.currentTime;
    let remaining = fakeDuration - currentTime;

    let minutes = Math.floor(remaining / 60);
    let seconds = Math.floor(remaining % 60);

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (remaining <= 0) {
        audio.pause();
        video.pause();
        audio.currentTime = 0;
        playButton.textContent = "►";
    }
};
