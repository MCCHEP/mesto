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
const slideImage = document.querySelector('.popup__image');
const slideTitle = document.querySelector('.popup__image-title');
const photoPopup = document.querySelector('.popup_type_photo')
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


// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const profileFormValidator = new FormValidator(validationParam, profileForm);
profileFormValidator.enableValidation();
const placeFormValidator = new FormValidator(validationParam, placeForm);
placeFormValidator.enableValidation();

//Функции
//Открытие и закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closeOnOverlay);
  document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(event) {
  const openedPopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(openedPopup);
  }
}

function closeOnOverlay(event) {
  closePopup(event.target);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closeOnOverlay);
  document.addEventListener('keydown', closeOnEscape);
}

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

class Card {
  constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  _likeImage() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _createSlide() {
    slideImage.src = this._link;
    slideImage.alt = this._name;
    slideTitle.textContent = this._name;
    openPopup(photoPopup);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => { this._likeImage(); } );
    this._deleteButton.addEventListener('click', () => { this._deleteCard(); });
    this._cardImage.addEventListener('click', () => { this._createSlide(); });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector('.element__image-title');
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._setEventListeners();

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    return this._element;
  }
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



