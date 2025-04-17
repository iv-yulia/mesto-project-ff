import "./pages/index.css";
import { initialCards } from "./components/cards";
import{openPopup, closePopup} from "./components/modal"

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");

// @todo: Кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

// @todo: Функция создания карточки
function createCard(card, handleDeleteCard, handleLikeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  imageElement.src = card.link;
  imageElement.alt = card.name;
  titleElement.textContent = card.name;

  deleteButton.addEventListener("click", handleDeleteCard);
  likeButton.addEventListener("click", handleLikeCard);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(e) {
  const listItem = e.target.closest(".card");
  listItem.remove();
}

// @todo: Функция постановки лайка карточке
function likeCard(e) {
  const likeElement = e.target;
  likeElement.classList.toggle("card__like-button_is-active");
}

// @todo: Вывести карточки на страницу
function renderCards(itemList) {
  itemList.forEach((card) => {
    const cardElement = createCard(card, deleteCard, likeCard);
    cardsContainer.append(cardElement);
  });
}


editButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
});

addButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});


renderCards(initialCards);
