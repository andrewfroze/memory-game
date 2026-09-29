import { createElement } from "./element-factory";
import { createModal, openModal, closeModal } from "./modal";
import { getLeaderboard } from "./leaderboard";

function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

function renderLeaderboardModal() {
  const content = createElement("div", {
    className: "leaderboard-modal",
  });

  const title = createElement("h2", {
    className: "leaderboard-modal__title",
    textContent: "Leaderboard",
  });

  content.append(title);

  const results = getLeaderboard();

  if (results.length === 0) {
    const emptyMessage = createElement("p", {
      className: "leaderboard-modal__empty",
      textContent: "No results yet",
    });

    content.append(emptyMessage);
  } else {
    const table = createElement("table", {
      className: "leaderboard-table",
    });

    const thead = createElement("thead");
    const headerRow = createElement("tr");

    ["Place", "Turns", "Date"].forEach((text) => {
      headerRow.append(
        createElement("th", {
          textContent: text,
        }),
      );
    });

    thead.append(headerRow);

    const tbody = createElement("tbody");

    results.slice(0, 10).forEach((result, index) => {
      const row = createElement("tr");

      [
        index + 1,
        result.moves,
        formatDate(result.date),
      ].forEach((value) => {
        row.append(
          createElement("td", {
            textContent: String(value),
          }),
        );
      });

      tbody.append(row);
    });

    table.append(thead, tbody);
    content.append(table);
  }

  const closeButton = createElement("button", {
    className: "modal__button",
    textContent: "Close",
  });

  closeButton.addEventListener("click", closeModal);
  content.append(closeButton);

  const dialog = createModal(content);
  openModal(dialog);
}

export { renderLeaderboardModal }