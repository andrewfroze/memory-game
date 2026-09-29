import { createElement } from "./element-factory";
import { createModal, openModal, closeModal } from "./modal";

function renderWinModal(moves, onNewGame) {
  const content = createElement("div", {
    className: "win-modal",
  });

  const title = createElement("h2", {
    className: "win-modal__title",
    textContent: "Win!",
  });

  const message = createElement("p", {
    className: "win-modal__message",
    textContent: "Congratulations! You found all pairs!",
  });

  const score = createElement("p", {
    className: "win-modal__score",
    textContent: `Moves: ${moves}`,
  });

  const buttons = createElement("div", {
    className: "modal__buttons",
  });

  const newGameButton = createElement("button", {
    className: "modal__button modal__button--primary",
    textContent: "New Game",
  });

  const closeButton = createElement("button", {
    className: "modal__button",
    textContent: "Close",
  });

  newGameButton.addEventListener("click", () => {
    closeModal();
    onNewGame();
  });

  closeButton.addEventListener("click", closeModal);

  buttons.append(newGameButton, closeButton);
  content.append(title, message, score, buttons);

  const dialog = createModal(content);
  openModal(dialog);
}

export { renderWinModal }