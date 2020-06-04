// Находим форму в DOM
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

function openClosePopup(popup) {
    popup.classList.toggle('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function profileFormHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    openClosePopup(profilePopup);
}

function getCards (arrayOfCards) {
  arrayOfCards.forEach((element) => {
    addItem(cardsContainer, renderCard(element.name, element.link))});
}

function renderCard(name, link) {
  const cardTemplate = document.querySelector('.card-template').content;
  // клонируем содержимое тега template
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.element__image-title');
  const cardImage = card.querySelector('.element__image');
  cardTitle.textContent = name;
  cardImage.src = link;
  return card;
}

function addItem(container, item) {
  container.append(item);
}

function placeFormHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Вставьте новые значения с помощью textContent
  addItem(cardsContainer, renderCard(placeNameInput.value,placeLinkInput.value));
  openClosePopup(placePopup);
}

document.addEventListener("DOMContentLoaded", () => {getCards(initialCards)});

profileFormCaller.addEventListener('click',() => {openClosePopup(profilePopup);});
profileFormCloser.addEventListener('click', () => {openClosePopup(profilePopup);});
profileForm.addEventListener('submit', profileFormHandler);

placeFormCaller.addEventListener('click', () => {openClosePopup(placePopup);});
placeFormCloser.addEventListener('click', () => {openClosePopup(placePopup);});
placeForm.addEventListener('submit', placeFormHandler);
