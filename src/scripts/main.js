import { createElement } from "./element-factory";
import { Game } from "./game";

let game = new Game();

const header = createElement("header");
const main = createElement("main");
const footer = createElement("footer");

document.body.append(header, main, footer);

const gameField = createElement("section", {
  className: "game-field"
});

for (let card of game.cards) {
  const cardFace= createElement("dev", {
    className: "card",
  });

  cardFace.append(createElement("img", {
    className: "card__img",
    src: card.img,
  }));
  gameField.append(cardFace);
}

main.append(gameField);