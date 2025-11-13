const video = document.querySelector(".video");
const audio = document.querySelector(".audio");
const playButton = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll(".time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let fakeDuration = 600;

// TIME SELECT
timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        fakeDuration = btn.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:0`;
    });
});

// SOUND PICKER
soundButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        audio.src = btn.getAttribute("data-sound");
        video.src = btn.getAttribute("data-video");

        audio.play();
        video.play();
        playButton.textContent = "❚❚";
    });
});

// PLAY / PAUSE
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

    let mins = Math.floor(remaining / 60);
    let secs = Math.floor(remaining % 60);

    timeDisplay.textContent = `${mins}:${secs}`;

    if (remaining <= 0) {
        audio.pause();
        video.pause();
        audio.currentTime = 0;
        playButton.textContent = "►";
    }
};
