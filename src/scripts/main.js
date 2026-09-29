import { createElement } from "./element-factory";
import { Game } from "./game";
import back from "../assets/back.webp";
import { renderWinModal } from "./win-modal";
import { renderLeaderboardModal } from "./leaderboard-modal";
import { saveResult } from "./leaderboard";

const BACK_FLIP_TIMEOUT = 700;
let game;
let movesElement;
let foundElement;

const header = createElement("header");
const main = createElement("main");
const footer = createElement("footer");

document.body.append(header, main, footer);

renderHeader();
startNewGame();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function finishGame() {
  if (!game.completed) {
    game.completed = true;

    saveResult(game.turns);

    renderWinModal(game.turns, () => {
      startNewGame();
    });
  }
}

function startNewGame() {
  game = new Game();
  updateCounts();
  main.replaceChildren(renderNewGameField());
}

function renderHeader() {
  const newGameButton = createElement("button", {
    className: "new-game-button",
    textContent: "New Game",
  });

  newGameButton.addEventListener("click", () => {
    startNewGame();
  });

  const leaderBoardButton = createElement("button", {
    className: "leader-board-button",
    textContent: "Leaderboard",
  });

  leaderBoardButton.addEventListener("click", () => {
    renderLeaderboardModal();
  });

  movesElement = createElement("label", {
    className: "moves",
  });

  foundElement = createElement("label", {
    className: "found",
  });

  header.append(newGameButton, movesElement, foundElement, leaderBoardButton);

}

function updateCounts() {
  movesElement.textContent = `Turns: ${game.turns}`;
  foundElement.textContent = `Found: ${game.found}/8`;
}

function renderNewGameField() {
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
      if (first === undefined) {
        first = index;
        firstCard = cardElem;
      } else {
        game.turns += 1;
        gameField.classList.add("blocked");
        const result = game.checkCards(first, index);
        if (result) {
          game.found += 1;
          cardElem.classList.add("found");
          firstCard.classList.add("found");
          if (game.found * 2 >= game.cards.length) {
            finishGame();
          }
        } else {
          await sleep(BACK_FLIP_TIMEOUT); 
          cardElem.classList.remove("card--flipped");
          firstCard.classList.remove("card--flipped");
        }
        first = undefined;
        firstCard = undefined;
        updateCounts();
        gameField.classList.remove("blocked");
      }
    });
  });

  return gameField;
}