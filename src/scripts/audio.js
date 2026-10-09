import music from "../assets/background.mp3";
import cardFlip from "../assets/card-flip.mp3";
import cardsShuffle from "../assets/cards-flipping.mp3";
import { loadSavedVolume } from "./sound-settings";

const backgroundMusic = new Audio(music);
const cardsShuffleSound = new Audio(cardsShuffle);

backgroundMusic.loop = true;

const savedSettings = loadSavedVolume();
let volume = Number(savedSettings.music);
let effects = Number(savedSettings.effects);

cardsShuffleSound.volume = effects / 100;

const startEvents = ["pointerdown", "keydown"];

function playBackgroundMusic() {
  if (!backgroundMusic.paused) {
    return Promise.resolve();
  }

  return backgroundMusic.play();
}

function playCardFlip() {
  if (effects === 0) {
    return;
  }
  const cardFlipSound = new Audio(cardFlip);
  cardFlipSound.volume = effects / 100;
  return cardFlipSound.play();
}

function playCardsShuffleSound() {
  if (effects === 0) {
    return;
  }
  if (!cardsShuffleSound.paused) {
    return;
  }

  return cardsShuffleSound.play().catch((error) => {
    console.warn("Could not play shuffle sound:", error);
  });;
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

function setEffectsVolume(newVolume) {
  effects = Math.max(0, Math.min(100, Number(newVolume)));
  cardsShuffleSound.volume = effects / 100;
}


export {
  setBackgroundVolume,
  pauseBackgroundMusic,
  playBackgroundMusic,
  setEffectsVolume,
  playCardFlip,
  playCardsShuffleSound,
};
