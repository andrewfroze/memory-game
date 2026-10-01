function shuffle(sequence) {
  for (let i = sequence.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [sequence[i], sequence[randomIndex]] = [sequence[randomIndex], sequence[i]];
  }

  return sequence;
}

export { shuffle };
