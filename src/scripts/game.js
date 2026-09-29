import { cards } from "./cards";
import { shuffle } from "./random";

class Game {
  constructor() {
    this.cards = this.generateBoard();
    this.found = 0;
    this.moves = 0;
    this.completed = false;
  }

  generateBoard() {
    const cardsWithPairs =  [...cards, ...cards];
    const shuffledCards = shuffle(cardsWithPairs);
    return shuffledCards;
  }

  checkCards(first, second) {
    return this.cards[first].id === this.cards[second].id;
  }
}

export { Game }