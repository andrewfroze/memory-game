import { cards } from "./cards";
import { shuffle } from "./random";

class Game {
  constructor() {
    this.cards = this.generateBoard();
  }

  generateBoard() {
    const cardsWithPairs =  [...cards, ...cards];
    const shuffledCards = shuffle(cardsWithPairs);
    return shuffledCards;
  }
}

export { Game }