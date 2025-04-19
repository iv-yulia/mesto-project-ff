// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(card, handleDeleteCard, handleLikeCard, handleOpenCard) {
  const { name, link } = card;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  imageElement.src = link;
  imageElement.alt = name;
  titleElement.textContent = name;

  deleteButton.addEventListener("click", handleDeleteCard);
  likeButton.addEventListener("click", handleLikeCard);
  imageElement.addEventListener("click", () => handleOpenCard(card));

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(e) {
  const listItem = e.target.closest(".card");
  listItem.remove();
}

// @todo: Функция постановки лайка карточке
function toggleLike(e) {
  const likeElement = e.target;
  likeElement.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, toggleLike };
