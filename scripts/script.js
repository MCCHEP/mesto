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

//Функции
//Открытие и закрытие попапа
function openClosePopup(popup) {
  popup.classList.toggle('popup_opened');
}

//Обработчик формы профиля
function profileFormHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  openClosePopup(profilePopup);
}

//Обработчик формы добавления места
function placeFormHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  addItem(cardsContainer, renderCard(placeNameInput.value, placeLinkInput.value));
  openClosePopup(placePopup);
}

//Создание карточек из массива
function getCards(arrayOfCards) {
  arrayOfCards.forEach((element) => {
    addItem(cardsContainer, renderCard(element.name, element.link))
  });
}

//Создание карточки из шаблона
function renderCard(name, link) {
  const cardTemplate = document.querySelector('.card-template').content;
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.element__image-title');
  const cardImage = card.querySelector('.element__image');
  const deleteCardButton = card.querySelector('.element__delete-button');
  const likeButton = card.querySelector('.element__like-button');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  deleteCardButton.addEventListener('click', function () {
    const cardItem = deleteCardButton.closest('.element');
    cardItem.remove();
  });

  cardImage.addEventListener('click', () => {
    createSlide(cardImage);
  }
  );

  likeButton.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    console.log(eventTarget);
    eventTarget.classList.toggle('element__like-button_active');
  });
  return card;
}

//Добавление элемента в контейнер
function addItem(container, item) {
  container.prepend(item);
}

function createSlide(image) {
  const slideImage = document.querySelector('.popup__image');
  const slideTitle = document.querySelector('.popup__image-title');
  slideImage.src = image.src;
  slideTitle.textContent = image.alt;
  openClosePopup(photoPopup);
}


//Слушатели
document.addEventListener("DOMContentLoaded", () => { getCards(initialCards) });
profileFormCaller.addEventListener('click', () => { openClosePopup(profilePopup); });
profileFormCloser.addEventListener('click', () => { openClosePopup(profilePopup); });
profileForm.addEventListener('submit', profileFormHandler);
placeFormCaller.addEventListener('click', () => { openClosePopup(placePopup); });
placeFormCloser.addEventListener('click', () => { openClosePopup(placePopup); });
placeForm.addEventListener('submit', placeFormHandler);
photoPopupCloser.addEventListener('click', () => { openClosePopup(photoPopup); });
