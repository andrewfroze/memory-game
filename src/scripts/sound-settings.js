const SOUND_SETTING_LOCAL_STORAGE_KEY = "memory-game-sound";

function loadSavedVolume() {
  return JSON.parse(localStorage.getItem(SOUND_SETTING_LOCAL_STORAGE_KEY) ?? 
    '{"music": 50, "effects": 50}');
}

export { loadSavedVolume, SOUND_SETTING_LOCAL_STORAGE_KEY }