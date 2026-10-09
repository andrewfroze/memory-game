import music from "../assets/background.mp3";
import { loadSavedVolume } from "./sound-settings";

const backgroundMusic = new Audio(music);

backgroundMusic.loop = true;

let volume = Number(loadSavedVolume());
const startEvents = ["pointerdown", "keydown"];

function playBackgroundMusic() {
  if (!backgroundMusic.paused) {
    return Promise.resolve();
  }

  return backgroundMusic.play();
}

function pauseBackgroundMusic() {
  backgroundMusic.pause();
}

function startBackgroundMusic() {
  if (volume === 0) {
    return;
  }

  backgroundMusic.volume = volume / 100;

  playBackgroundMusic()
    .then(() => {
      startEvents.forEach((event) => {
        document.removeEventListener(event, startBackgroundMusic);
      });
    })
    .catch((error) => {
      console.warn("Could not play background music:", error);
    });
}

startEvents.forEach((event) => {
  document.addEventListener(event, startBackgroundMusic);
});

function setBackgroundVolume(newVolume) {
  volume = Math.max(0, Math.min(100, Number(newVolume)));
  backgroundMusic.volume = volume / 100;

  if (volume === 0) {
    pauseBackgroundMusic();
    return;
  }

  return playBackgroundMusic().catch((error) => {
    console.warn("Could not play background music:", error);
  });
}

export {
  setBackgroundVolume,
  pauseBackgroundMusic,
  playBackgroundMusic,
};
