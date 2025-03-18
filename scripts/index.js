// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, handleDeleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  imageElement.src = card.link;
  imageElement.alt = card.name;
  titleElement.textContent = card.name;

  deleteButton.addEventListener("click", handleDeleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(e) {
  const listItem = e.target.closest(".card");
  listItem.remove();
}

// @todo: Вывести карточки на страницу
function renderCards(itemList) {
  itemList.forEach((card) => {
    const cardElement = createCard(card, deleteCard);
    cardsContainer.append(cardElement);
  });
}

renderCards(initialCards);
