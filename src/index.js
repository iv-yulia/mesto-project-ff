import "./pages/index.css";
import * as domNodes from "./utils/constants";
import { validationConfig as config } from "./utils/configs";
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
import { isLoading, showSubmitError } from "./utils/helpers";

const {
  popups,
  cardsContainer,
  profileName,
  profileDescription,
  editAvatarPopup,
  editAvatarForm,
  avatarInput,
  saveAvatarButton,
  editProfilePopup,
  editProfileForm,
  profileNameInput,
  profileDescriptionInput,
  saveProfileInfoButton,
  addCardPopup,
  addCardForm,
  cardNameInput,
  cardLinkInput,
  saveCardButton,
  viewCardPopup,
  viewCardImage,
  viewCardCaption,
  confirmationPopup,
  confirmDeletionForm,
  editButton,
  addButton,
  editAvatar,
} = domNodes;

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
    .catch((err) => {
      showSubmitError(true, editProfilePopup);
      console.log(err);
    })
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
    })
    .catch((err) => {
      showSubmitError(true, addCardPopup);
      console.log(err);
    })
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
    .catch((err) => {
      showSubmitError(true, editAvatarPopup);
      console.log(err);
    })
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
    .catch((err) => {
      showSubmitError(true, confirmationPopup);
      console.log(err);
    });
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
  clearValidation(addCardForm, config);
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
