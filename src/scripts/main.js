import { createElement } from "./element-factory";
import { Game } from "./game";
import back from "../assets/back.png";

let game = new Game();
const BACK_FLIP_TIMEOUT = 500;

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

let first;
let firstCard;

game.cards.forEach((card, index) => {
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

  cardElem.addEventListener("click", async () => {
    if (!first) {
      first = index;
      firstCard = cardElem;
    } else {
      const result = game.checkCards(first, index);
      if (result) {
        game.found += 1;
      } else {
        await sleep(BACK_FLIP_TIMEOUT); 
        cardElem.classList.remove("card--flipped");
        firstCard.classList.remove("card--flipped");
      }
      first = undefined;
      firstCard = undefined;
    }
  });
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

main.append(gameField);