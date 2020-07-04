import {closePopup, closeOnEscape, closeOnOverlay, openPopup  } from "./utils.js";
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

// Находим элементы в DOM и объявляем константы
const profilePopup = document.querySelector('.popup_type_profile-edit');
const profileForm = document.querySelector('.form_type_profile-edit');
const profileFormCaller = document.querySelector('.profile__edit-button');
const profileFormCloser = profilePopup.querySelector('.popup__close-button');
const nameInput = profileForm.querySelector('.form__input_type_name');
const jobInput = profileForm.querySelector('.form__input_type_occupation');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__occupation');
const placeForm = document.querySelector('.form_type_place-add');
const placePopup = document.querySelector('.popup_type_add-place');
const placeFormCaller = document.querySelector('.profile__add-button');
const placeFormCloser = placePopup.querySelector('.popup__close-button');
const placeNameInput = placeForm.querySelector('.form__input_type_place-name');
const placeLinkInput = placeForm.querySelector('.form__input_type_link');
const cardsContainer = document.querySelector('.elements');
export const slideImage = document.querySelector('.popup__image');
export const slideTitle = document.querySelector('.popup__image-title');
export const photoPopup = document.querySelector('.popup_type_photo')
const photoPopupCloser = photoPopup.querySelector('.popup__close-button');
const initialCards = [
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
const validationParam = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
};


// Включение валидации
const profileFormValidator = new FormValidator(validationParam, profileForm);
const placeFormValidator = new FormValidator(validationParam, placeForm);

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

//Функции
//Заполнение формы профиля значениями со страницы
function fillFromPage() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//Обработчик формы профиля
function profileFormHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}

//Обработчик вызова формы профиля
function openProfileForm() {
  fillFromPage();
  profileFormValidator.resetValidationErrors();
  openPopup(profilePopup);
}

//Обработчик вызова добавления карточки
function openPlaceForm() {
  placeFormValidator.resetValidationErrors();
  openPopup(placePopup);
}

//Добавление элемента в контейнер
function addItem(container, item) {
  container.prepend(item);
}


//Обработчик формы добавления места
function placeFormHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const card = new Card({name: placeNameInput.value, link: placeLinkInput.value}, '.card-template');
  addItem(cardsContainer, card.generateCard());
  closePopup(placePopup);
  placeForm.reset();
}

//Создание карточек из массива
function getCards(arrayOfCards) {
  arrayOfCards.forEach((element) => {
    const card = new Card(element, '.card-template');
    addItem(cardsContainer, card.generateCard());
  });
}


//Слушатели
document.addEventListener("DOMContentLoaded", () => { getCards(initialCards) });

profileFormCaller.addEventListener('click', openProfileForm);
profileFormCloser.addEventListener('click', () => {
  closePopup(profilePopup);
});
profileForm.addEventListener('submit', profileFormHandler);

placeFormCaller.addEventListener('click', openPlaceForm);
placeFormCloser.addEventListener('click', () => { closePopup(placePopup); });
placeForm.addEventListener('submit', placeFormHandler);

photoPopupCloser.addEventListener('click', () => { closePopup(photoPopup); });



