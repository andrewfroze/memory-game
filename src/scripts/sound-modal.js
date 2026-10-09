import { createElement } from "./element-factory";
import { createModal, openModal, closeModal } from "./modal";

const SOUND_SETTING_LOCAL_STORAGE_KEY = "memory-game-sound";

function renderSoundModal({ updateSoundIcon }) {
  const content = createElement("div", {
    className: "sound-modal",
  });

  const title = createElement("h2", {
    className: "sound-modal__title",
    textContent: "Sound",
  });

  const soundInputContainer = createElement("div", {
    className: "sound-input-container",
  });

  const soundValue = localStorage.getItem(SOUND_SETTING_LOCAL_STORAGE_KEY) ?? 50;

  const soundInput = createElement("input", {
    className: "sound-input",
    value: soundValue,
    type: "range",
    min: 0,
    max: 100,
  });

  const soundValueLabel = createElement("label", {
    className: "sound-input-label",
    textContent: soundValue,
  });

  const buttons = createElement("div", {
    className: "modal__buttons",
  });

  const saveButton = createElement("button", {
    className: "modal__button",
    textContent: "Save",
    disabled: true,
  });

  const closeButton = createElement("button", {
    className: "modal__button",
    textContent: "Close",
  });

  saveButton.addEventListener("click", () => {
    localStorage.setItem(SOUND_SETTING_LOCAL_STORAGE_KEY, soundInput.value);
    updateSoundIcon(soundInput.value);
    closeModal();
  });

  closeButton.addEventListener("click", () => {
    closeModal();
    updateSoundIcon(loadSavedVolume());
  });

  soundInput.addEventListener("input", () => {
    soundValueLabel.textContent = soundInput.value;
    saveButton.disabled = false;
    updateSoundIcon(soundInput.value);
  });

  soundInputContainer.append(soundInput, soundValueLabel);
  buttons.append(saveButton, closeButton);
  content.append(title, soundInputContainer, buttons);

  const dialog = createModal(content);
  openModal(dialog);
}

function loadSavedVolume() {
  return localStorage.getItem(SOUND_SETTING_LOCAL_STORAGE_KEY) ?? 50;
}

export { renderSoundModal, loadSavedVolume }