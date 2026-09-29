import { createElement } from "./element-factory"

let activeDialog;

function createModal(content) {
  const dialog = createElement("dialog", {
    className: "modal",
  });

  const modalContent = createElement("div", {
    className: "modal__content",
  });

  modalContent.append(content);
  dialog.append(modalContent);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeModal();
    }
  });

  return dialog;
}

function openModal(dialog) {
  if (activeDialog) {
    closeModal();
  }

  activeDialog = dialog;
  document.body.append(dialog);

  dialog.showModal();
  document.body.classList.add("modal-open");
}

function closeModal() {
  if (!activeDialog) {
    return;
  }

  activeDialog.close();
  activeDialog.remove();

  activeDialog = undefined;
  document.body.classList.remove("modal-open");
}

export { createModal, openModal, closeModal }