import { likeCard } from "../components/api";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
const createCard = (
  card,
  userId,
  handleDeleteCard,
  handleLikeCard,
  handleOpenCard
) => {
  const { name, link, likes, owner, _id } = card;

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const totalCardLikes = cardElement.querySelector(".card__like-number");

  imageElement.src = link;
  imageElement.alt = name;
  titleElement.textContent = name;
  totalCardLikes.textContent = likes.length;

  const isLiked = likes.some((user) => user._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (userId !== owner._id) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      handleDeleteCard(_id, cardElement)
    );
  }

  likeButton.addEventListener("click", () =>
    handleLikeCard(_id, totalCardLikes, likeButton)
  );

  imageElement.addEventListener("click", () => handleOpenCard(card));

  return cardElement;
};

// @todo: Функция постановки лайка карточке
const toggleLike = (id, likes, button) => {
  const isLiked = button.classList.contains("card__like-button_is-active")
  likeCard(id, isLiked).then((card) => {
    likes.textContent = card.likes.length;
    button.classList.toggle("card__like-button_is-active");
  });
};


export { createCard, toggleLike };
