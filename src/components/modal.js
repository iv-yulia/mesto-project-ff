function popupEscClose(e) {
  const popup = document.querySelector(".popup_is-opened");
  if (e.key === "Escape") {
    closePopup(popup);
  }
  return;
}

function popupOverlayClose(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget);
  }
  return;
}

function handleCloseButton(popup) {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
}

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", popupEscClose);
  popup.addEventListener("click", popupOverlayClose);
  handleCloseButton(popup);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", popupEscClose);
}

export { openPopup, closePopup };
