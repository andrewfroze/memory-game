import { createElement } from "./element-factory";
import { Game } from "./game";
import back from "../assets/back.png";

let game = new Game();

const header = createElement("header");
const main = createElement("main");
const footer = createElement("footer");

document.body.append(header, main, footer);

header.append(createElement("h1", {
  className: "game-title",
  textContent: "Memory game",
}));

const gameField = createElement("section", {
  className: "game-field"
});

for (let card of game.cards) {
  const cardElem = createElement("div", {
    className: "card",
  });

  const cardInner = createElement("div", {
    className: "card__inner",
  })

  cardInner.append(createElement("img", {
    className: "card__face",
    src: card.img,
    alt: ""
  }));

  cardInner.append(createElement("img", {
    className: "card__back",
    src: back,
    alt: "",
  }));
  
  cardElem.append(cardInner);
  gameField.append(cardElem);

  cardElem.addEventListener("click", () => {
    cardElem.classList.toggle("card--flipped");
  });
}


main.append(gameField);