import "./pages/index.css";
import { initialCards } from "./components/cards";
import { openPopup, closePopup } from "./components/modal";
import { createCard, deleteCard, toggleLike } from "./components/card";

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// Элементы модального окна для редактирования профиля
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const profileNameInput = editProfilePopup.querySelector(".popup__input_type_name");
const profileDescriptionInput = editProfilePopup.querySelector(".popup__input_type_description");
// Элементы модального окна для добавления новой карточки
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardPopup.querySelector(".popup__input_type_url");
// Элементы модального окна для просмотра изображения
const viewCardPopup = document.querySelector(".popup_type_image");
const viewCardImage = viewCardPopup.querySelector(".popup__image");
const viewCardCaption = viewCardPopup.querySelector(".popup__caption");
// Кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// Добавить класс анимации на модальные окна
popups.forEach((popup) => popup.classList.add("popup_is-animated"));

// Заполнить поля формы информацией из профиля
function fillPopupInputs() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Отрисовать карточку
function renderCard(card) {
  return createCard(card, deleteCard, toggleLike, openImagePopup);
}

// @todo: Вывести все карточки на страницу
function renderInitialCards(itemList) {
  itemList.forEach((card) => {
    cardsContainer.append(renderCard(card));
  });
}

renderInitialCards(initialCards);

// Добавить новую карточку на страницу
function addNewCard() {
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  cardsContainer.prepend(renderCard({ name, link }));
}

// Редактировать профиль
function updateProfile() {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

// Обработчики «отправки» форм
function handleProfileFormSubmit(e) {
  e.preventDefault();
  updateProfile();
  closePopup(editProfilePopup);
  editProfileForm.reset();
}

function handleCardFormSubmit(e) {
  e.preventDefault();
  addNewCard();
  closePopup(addCardPopup);
  addCardForm.reset();
}

// Открыть изображение для просмотра
function openImagePopup(card) {
  const { name, link } = card;
  viewCardImage.src = link;
  viewCardCaption.alt = name;
  viewCardCaption.textContent = name;
  openPopup(viewCardPopup);
}

editButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  fillPopupInputs();
});
addButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

addCardForm.addEventListener("submit", handleCardFormSubmit);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
