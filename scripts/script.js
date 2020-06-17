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

//Добавление элемента в контейнер
function addItem(container, item) {
  container.prepend(item);
}

//Создание слайда
function createSlide(event) {
  if (event.target.classList.contains('element__image')) {
    const currentImage = event.target;
    const slideImage = document.querySelector('.popup__image');
    const slideTitle = document.querySelector('.popup__image-title');
    slideImage.src = currentImage.src;
    slideImage.alt = currentImage.alt;
    slideTitle.textContent = currentImage.alt;
    openPopup(photoPopup);
  }
}

//Обработчик слушателя удаления
function deleteCard(event) {
  if (event.target.classList.contains('element__delete-button')) {
    const parentItem = event.target.parentNode;
    parentItem.remove();
  }
}

//Обработчик слушателя лайка
function likeImage(event) {
  if (event.target.classList.contains('element__like-button')) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('element__like-button_active');
  }
}


//Создание карточки из шаблона
function renderCard(name, link) {
  const cardTemplate = document.querySelector('.card-template').content;
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.element__image-title');
  const cardImage = card.querySelector('.element__image');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return card;
}

//Обработчик формы добавления места
function placeFormHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  addItem(cardsContainer, renderCard(placeNameInput.value, placeLinkInput.value));
  closePopup(placePopup);
  placeForm.reset();
}

//Создание карточек из массива
function getCards(arrayOfCards) {
  arrayOfCards.forEach((element) => {
    addItem(cardsContainer, renderCard(element.name, element.link))
  });
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationParam);

//Слушатели
document.addEventListener("DOMContentLoaded", () => { getCards(initialCards) });
//Лайки
document.addEventListener('click', likeImage);
//Удаление
document.addEventListener('click', deleteCard);
//Слайды
document.addEventListener('click', createSlide);



profileFormCaller.addEventListener('click', fillFromPage);
profileFormCaller.addEventListener('click', () => { resetValidationErrors(profileForm, validationParam); });
profileFormCaller.addEventListener('click', () => { openPopup(profilePopup); });
profileFormCloser.addEventListener('click', () => {
  closePopup(profilePopup);
});
profileForm.addEventListener('submit', profileFormHandler);

placeFormCaller.addEventListener('click', () => { openPopup(placePopup); });
placeFormCaller.addEventListener('click', () => { resetValidationErrors(placeForm, validationParam); });
placeFormCloser.addEventListener('click', () => { closePopup(placePopup); });
placeForm.addEventListener('submit', placeFormHandler);
photoPopupCloser.addEventListener('click', () => { closePopup(photoPopup); });

