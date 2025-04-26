import "./pages/index.css";
import { initialCards } from "./components/cards";
import { openPopup, closePopup } from "./components/modal";
import { createCard, deleteCard, toggleLike } from "./components/card";

// @todo: DOM узлы
const popups = document.querySelectorAll(".popup");
const cardsContainer = document.querySelector(".places__list");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// Элементы модального окна для редактирования профиля
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const profileNameInput = editProfilePopup.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
);
// Элементы модального окна для добавления новой карточки
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = addCardPopup.querySelector(".popup__input_type_url");
// Элементы модального окна для просмотра изображения
const viewCardPopup = document.querySelector(".popup_type_image");
const viewCardImage = viewCardPopup.querySelector(".popup__image");
const viewCardCaption = viewCardPopup.querySelector(".popup__caption");
// Кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

popups.forEach((popup) => setPopupEventListeners(popup));

// Заполнить поля формы информацией из профиля
const fillPopupInputs = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

// Добавить новую карточку на страницу
const addNewCard = () => {
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  cardsContainer.prepend(renderCard({ name, link }));
}

// Редактировать профиль
const updateProfile = () => {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

// Обработчики «отправки» форм
const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  updateProfile();
  closePopup(editProfilePopup);
  editProfileForm.reset();
}

const handleCardFormSubmit = (e) => {
  e.preventDefault();
  addNewCard();
  closePopup(addCardPopup);
  addCardForm.reset();
}

// Открыть изображение для просмотра
const openImagePopup = (card) => {
  const { name, link } = card;
  viewCardImage.src = link;
  viewCardCaption.alt = name;
  viewCardCaption.textContent = name;
  openPopup(viewCardPopup);
}

// Отрисовать карточку
const renderCard = (card) =>
  createCard(card, deleteCard, toggleLike, openImagePopup);

// @todo: Вывести все карточки на страницу
const renderInitialCards = (itemList) => {
  itemList.forEach((card) => cardsContainer.append(renderCard(card)));
};

renderInitialCards(initialCards);

editButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  fillPopupInputs();
});
addButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

addCardForm.addEventListener("submit", handleCardFormSubmit);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
