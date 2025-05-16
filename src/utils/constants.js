
// @todo: DOM узлы
export const popups = document.querySelectorAll(".popup");
export const cardsContainer = document.querySelector(".places__list");
export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
// Элементы модального окна для редактирования аватара
export const editAvatarPopup = document.querySelector(".popup_type_avatar");
export const editAvatarForm = editAvatarPopup.querySelector(".popup__form");
export const avatarInput = editAvatarPopup.querySelector(".popup__input_type_avatar");
export const saveAvatarButton = editAvatarPopup.querySelector(".popup__button");
// Элементы модального окна для редактирования профиля
export const editProfilePopup = document.querySelector(".popup_type_edit");
export const editProfileForm = editProfilePopup.querySelector(".popup__form");
export const profileNameInput = editProfilePopup.querySelector(
  ".popup__input_type_name"
);
export const profileDescriptionInput = editProfilePopup.querySelector(
  ".popup__input_type_description"
);
export const saveProfileInfoButton = editProfilePopup.querySelector(".popup__button");
// Элементы модального окна для добавления новой карточки
export const addCardPopup = document.querySelector(".popup_type_new-card");
export const addCardForm = addCardPopup.querySelector(".popup__form");
export const cardNameInput = addCardPopup.querySelector(
  ".popup__input_type_card-name"
);
export const cardLinkInput = addCardPopup.querySelector(".popup__input_type_url");
export const saveCardButton = addCardPopup.querySelector(".popup__button");
// Элементы модального окна для просмотра изображения
export const viewCardPopup = document.querySelector(".popup_type_image");
export const viewCardImage = viewCardPopup.querySelector(".popup__image");
export const viewCardCaption = viewCardPopup.querySelector(".popup__caption");

export const confirmationPopup = document.querySelector(".popup_type_confirm");
export const confirmDeletionForm = confirmationPopup.querySelector(".popup__form");
// Кнопки
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const editAvatar = document.querySelector(".profile__image");