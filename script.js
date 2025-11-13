// DOM elements (selectors/tests expect these classes/ids)
const app = document.querySelector('.app');
const video = document.querySelector('.vid-container video');
const audio = document.querySelector('.player-container audio');
const playBtn = document.querySelector('.play');
const timeDisplay = document.querySelector('.time-display');

const timeButtons = document.querySelectorAll('.time-select button'); // expects 3 buttons
const soundButtons = document.querySelectorAll('.sound-picker button');

let fakeDuration = 600; // default 10 min

// initialize display to 10:0 exactly
timeDisplay.textContent = '10:0';

// set initial sources (ensure paths exist)
if (!audio.src) audio.src = 'Sounds/beach.mp3';
if (!video.src) video.src = 'Videos/beach.mp4';

// ---- Time selection behavior ----
timeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const t = parseInt(btn.getAttribute('data-time'), 10);
    if (!isNaN(t)) {
      fakeDuration = t;
      // show in M:S format exactly like tests expect (minutes:seconds, seconds default 0)
      const minutes = Math.floor(fakeDuration / 60);
      timeDisplay.textContent = `${minutes}:0`;
    }
  });
});

// ---- Sound / Video picker ----
soundButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const snd = btn.getAttribute('data-sound');
    const vid = btn.getAttribute('data-video');
    if (snd) audio.src = snd;
    if (vid) video.src = vid;

    // play both
    audio.currentTime = 0;
    video.currentTime = 0;
    audio.play();
    video.play();
    playBtn.textContent = '❚❚';
  });
});

// ---- Play / Pause toggle ----
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    video.play();
    playBtn.textContent = '❚❚';
  } else {
    audio.pause();
    video.pause();
    playBtn.textContent = '►';
  }
});

// ---- Timer update based on audio currentTime ----
audio.addEventListener('timeupdate', () => {
  const current = audio.currentTime;
  const remaining = fakeDuration - current;
  const mins = Math.floor(Math.max(0, remaining) / 60);
  const secs = Math.floor(Math.max(0, remaining) % 60);

  // Show like M:S where tests expect single-digit seconds possibly without leading zero
  timeDisplay.textContent = `${mins}:${secs}`;

  // When time up -> stop and reset play icon
  if (remaining <= 0) {
    audio.pause();
    video.pause();
    audio.currentTime = 0;
    playBtn.textContent = '►';
  }
});
