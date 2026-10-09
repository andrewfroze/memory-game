const SOUND_SETTING_LOCAL_STORAGE_KEY = "memory-game-sound";

function loadSavedVolume() {
  return localStorage.getItem(SOUND_SETTING_LOCAL_STORAGE_KEY) ?? 50;
}

export { loadSavedVolume, SOUND_SETTING_LOCAL_STORAGE_KEY }