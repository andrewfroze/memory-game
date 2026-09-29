const LEADERBOARD_KEY = "memory-game-leaderboard";
const LEADERBOARD_LIMIT = 10;

export function getLeaderboard() {
  const savedLeaderBoard = localStorage.getItem(LEADERBOARD_KEY);
  return savedLeaderBoard ? JSON.parse(savedLeaderBoard) : [];
}

export function saveResult(turns) {
  const results = getLeaderboard();

  results.push({
    turns,
    date: new Date().toISOString().slice(0, 10),
  });

  results.sort((a, b) => a.moves - b.moves || a.date.localeCompare(b.date));

  localStorage.setItem(
    LEADERBOARD_KEY,
    JSON.stringify(results.slice(0, LEADERBOARD_LIMIT)),
  );
}