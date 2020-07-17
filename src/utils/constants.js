export const cardListSelector = '.elements';
export const profileForm = document.querySelector('.form_type_profile-edit');
export const profileFormCaller = document.querySelector('.profile__edit-button');
export const nameInput = profileForm.querySelector('.form__input_type_name');
export const jobInput = profileForm.querySelector('.form__input_type_occupation');
export const profileName = '.profile__name';
export const profileJob = '.profile__occupation';
export const placeForm = document.querySelector('.form_type_place-add');
export const placePopupSelector = '.popup_type_add-place';
export const placeFormCaller = document.querySelector('.profile__add-button');
export const placeNameInput = placeForm.querySelector('.form__input_type_place-name');
export const placeLinkInput = placeForm.querySelector('.form__input_type_link');
export const cardsContainer = document.querySelector('.elements');
export const photoPopupSelector = '.popup_type_photo';
export const profilePopupSelector = '.popup_type_profile-edit';
export const slideImage = document.querySelector('.popup__image');
export const slideTitle = document.querySelector('.popup__image-title');
export const validationParam = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
};
export  const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



