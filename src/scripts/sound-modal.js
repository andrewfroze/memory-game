import { setBackgroundVolume, setEffectsVolume } from "./audio";
import { createElement } from "./element-factory";
import { createModal, openModal, closeModal } from "./modal";
import { loadSavedVolume, SOUND_SETTING_LOCAL_STORAGE_KEY } from "./sound-settings";

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

  const effectsInputContainer = createElement("div", {
    className: "effects-input-container",
  });

  const savedSettings = loadSavedVolume();
  const soundValue = savedSettings.music;
  const effectsValue = savedSettings.effects;

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



  const effectsInput = createElement("input", {
    className: "effects-input",
    value: effectsValue,
    type: "range",
    min: 0,
    max: 100,
  });

  const effectsValueLabel = createElement("label", {
    className: "effects-input-label",
    textContent: effectsValue,
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
    localStorage.setItem(SOUND_SETTING_LOCAL_STORAGE_KEY, 
      JSON.stringify({
        music: soundInput.value,
        effects: effectsInput.value,
      }));
    updateSoundIcon(soundInput.value);
    closeModal();
    setBackgroundVolume(soundInput.value);
  });

  closeButton.addEventListener("click", () => {
    closeModal();
    const savedSettings = loadSavedVolume();
    const volume = Number(savedSettings.music);
    const effects = Number(savedSettings.effects);
    updateSoundIcon(volume);
    setBackgroundVolume(volume);
    setEffectsVolume(effects);
  });

  soundInput.addEventListener("input", () => {
    soundValueLabel.textContent = soundInput.value;
    saveButton.disabled = false;
    updateSoundIcon(soundInput.value);
    setBackgroundVolume(+soundInput.value);
  });

  effectsInput.addEventListener("input", () => {
    effectsValueLabel.textContent = effectsInput.value;
    saveButton.disabled = false;
    setEffectsVolume(+effectsInput.value);
  });

  const musicSettingTitle = createElement("h3", {
    className: "sound-setting-title",
    textContent: "Music volume",
  });

    const effectsSettingTitle = createElement("h3", {
    className: "sound-setting-title",
    textContent: "Effects volume",
  });

  soundInputContainer.append(soundInput, soundValueLabel);
  effectsInputContainer.append(effectsInput, effectsValueLabel);
  buttons.append(saveButton, closeButton);
  content.append(title, musicSettingTitle, soundInputContainer, effectsSettingTitle, effectsInputContainer, buttons);

  const dialog = createModal(content);
  openModal(dialog);
}

export { renderSoundModal }