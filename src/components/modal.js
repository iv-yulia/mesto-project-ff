const popupIsOpen = "popup_is-opened";

// Закрытие модального окна нажатием на Esc
const closePopupEsc = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(`.${popupIsOpen}`);
    closePopup(popup);
  }
  return;
};

// Открытие модального окна
const openPopup = (popup) => {
  popup.classList.add(popupIsOpen);
  document.addEventListener("keydown", closePopupEsc);
};

// Закрытие модального окна
const closePopup = (popup) => {
  popup.classList.remove(popupIsOpen);
  document.removeEventListener("keydown", closePopupEsc);
};

// Логика обработки событий модального окна
const setPopupEventListeners = (popup) => {
// Добавить класс анимации на модальные окна
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("popup__close") ||
      e.target === e.currentTarget
    ) {
      closePopup(popup);
    }
  });
};

export { openPopup, closePopup, setPopupEventListeners };
