const popupIsOpen = "popup_is-opened";

// Закрытие модального окна нажатием на Esc
function closePopupEsc(e) {
  // const popup = document.querySelector(`.${popupIsOpen}`);
  if (e.key === "Escape") {
    const popup = document.querySelector(`.${popupIsOpen}`);
    closePopup(popup);
  }
  return;
}

// Закрытие модального окна кликом на оверлей
function closePopupOverlay(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget);
  }
  return;
}

// Устанавливаем слушатель на кнопку крестик
function setCloseButton(popup) {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
}

// Открытие модального окна
function openPopup(popup) {
  popup.classList.add(popupIsOpen);
  document.addEventListener("keydown", closePopupEsc);
  popup.addEventListener("click", closePopupOverlay);
  setCloseButton(popup);
}

// Закрытие модального окна
function closePopup(popup) {
  popup.classList.remove(popupIsOpen);
  document.removeEventListener("keydown", closePopupEsc);
}

export { openPopup, closePopup };
