import "./pages/index.css";
import {
  openPopup,
  closePopup,
  setPopupEventListeners,
} from "./components/modal";
import { createCard, toggleLike, deleteCard } from "./components/card";
import { clearValidation, enableValidation } from "./components/validation";
import {
  getInitialCards,
  getProfileInfo,
  updateProfileInfo,
  uploadNewCard,
  updateProfileAvatar,
  removeCard,
} from "./components/api";
import { isLoading } from "./components/utils";

// @todo: DOM узлы
const popups = document.querySelectorAll(".popup");
const cardsContainer = document.querySelector(".places__list");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// Элементы модального окна для редактирования аватара
const editAvatarPopup = document.querySelector(".popup_type_avatar");
const editAvatarForm = editAvatarPopup.querySelector(".popup__form");
const avatarInput = editAvatarPopup.querySelector(".popup__input_type_avatar");
const saveAvatarButton = editAvatarPopup.querySelector(".popup__button");
// Элементы модального окна для редактирования профиля
const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const profileNameInput = editProfilePopup.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
);
const saveProfileInfoButton = editProfilePopup.querySelector(".popup__button");
// Элементы модального окна для добавления новой карточки
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = addCardPopup.querySelector(".popup__input_type_url");
const saveCardButton = addCardPopup.querySelector(".popup__button");
// Элементы модального окна для просмотра изображения
const viewCardPopup = document.querySelector(".popup_type_image");
const viewCardImage = viewCardPopup.querySelector(".popup__image");
const viewCardCaption = viewCardPopup.querySelector(".popup__caption");

const confirmationPopup = document.querySelector(".popup_type_confirm");
const confirmDeletionForm = confirmationPopup.querySelector(".popup__form");
// Кнопки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatar = document.querySelector(".profile__image");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let currentUser = null;
let idCardForDelete = null;
let cardForDelete = null;

popups.forEach((popup) => setPopupEventListeners(popup));

Promise.all([getInitialCards(), getProfileInfo()])
  .then((res) => {
    const [cards, userInfo] = res;
    currentUser = userInfo._id;
    renderInitialCards(cards);
    setProfileInfo(userInfo);
  })
  .catch((err) => console.log(err));

const setProfileInfo = (user) => {
  const { name, about, avatar } = user;
  profileName.textContent = name;
  profileDescription.textContent = about;
  editAvatar.style.backgroundImage = `url(${avatar})`;
};

// Заполнить поля формы информацией из профиля
const fillPopupInputs = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

// Открытие попапа удаления карточки
const openConfirmationPopup = (id, card) => {
  openPopup(confirmationPopup);
  idCardForDelete = id;
  cardForDelete = card;
};

// Редактировать профиль
const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  const name = profileNameInput.value;
  const about = profileDescriptionInput.value;
  isLoading(true, saveProfileInfoButton);
  updateProfileInfo(name, about)
    .then((user) => {
      const { name, about } = user;
      profileName.textContent = name;
      profileDescription.textContent = about;
      closePopup(editProfilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => isLoading(false, saveProfileInfoButton));
};

// Добавить новую карточку на страницу
const handleCardFormSubmit = (e) => {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  isLoading(true, saveCardButton);
  uploadNewCard(name, link)
    .then((card) => {
      cardsContainer.prepend(renderCard(card));
      closePopup(addCardPopup);
      clearValidation(addCardForm, config);
    })
    .catch((err) => console.log(err))
    .finally(() => isLoading(false, saveCardButton));
};

// Редактировать аватар
const handleAvatarFormSubmit = (e) => {
  e.preventDefault();
  const avatar = avatarInput.value;
  isLoading(true, saveAvatarButton);
  updateProfileAvatar(avatar)
    .then((user) => {
      const { avatar } = user;
      editAvatar.style.backgroundImage = `url(${avatar})`;
      closePopup(editAvatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => isLoading(false, saveAvatarButton));
};

// Удаление карточки
const handleDeleteCard = (e) => {
  e.preventDefault();
  removeCard(idCardForDelete)
    .then(() => {
      deleteCard(cardForDelete);
      closePopup(confirmationPopup);
    })
    .catch((err) => console.log(err));
};

// Открыть изображение для просмотра
const openImagePopup = (card) => {
  const { name, link } = card;
  viewCardImage.src = link;
  viewCardCaption.alt = name;
  viewCardCaption.textContent = name;
  openPopup(viewCardPopup);
};

// Отрисовать карточку
const renderCard = (card) => {
  return createCard(
    card,
    currentUser,
    openConfirmationPopup,
    toggleLike,
    openImagePopup
  );
};

// @todo: Вывести все карточки на страницу
const renderInitialCards = (itemList) => {
  itemList.forEach((card) => cardsContainer.append(renderCard(card)));
};

enableValidation(config);

editButton.addEventListener("click", () => {
  clearValidation(editProfileForm, config);
  openPopup(editProfilePopup);
  fillPopupInputs();
});
addButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

editAvatar.addEventListener("click", () => {
  clearValidation(editAvatarForm, config);
  openPopup(editAvatarPopup);
});

addCardForm.addEventListener("submit", handleCardFormSubmit);
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);
confirmDeletionForm.addEventListener("submit", handleDeleteCard);
