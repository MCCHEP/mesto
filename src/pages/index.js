
import './index.css'; // добавьте импорт главного файла стилей
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  cardListSelector,
  photoPopupSelector,
  placePopupSelector,
  placeFormCaller,
  profileFormCaller,
  profilePopupSelector,
  validationParam,
  placeForm,
  profileName,
  profileJob,
  profileForm,
  nameInput,
  jobInput
}  from "../utils/constants.js";

//Функции
//Колбэк слайда
const handleCardClick = (link, name) => { photoPopup.open(link, name); };

//Колбэк создания карточки
const cardRenderer =  (data) => {
  const card = new Card(data, '.card-template', handleCardClick);
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
}

//Заполнение формы со страницы
const fillFromPage = (name, info) => {
  nameInput.value = name;
  jobInput.value = info;
};

//Обработчик вызова формы профиля
const openProfileForm = () => {
  const data = profile.getUserInfo();
  fillFromPage(data.name, data.info);
  profileFormValidator.resetValidationErrors();
  profilePopup.open();
};

//Обработчик вызова формы добавления карточки
const openPlaceForm = () => {
  placeFormValidator.resetValidationErrors();
  placePopup.open();
};

//Создание экземпляров классов
//Список карточек
const cardList = new Section({
  data: initialCards,
  renderer: cardRenderer
}, cardListSelector);
//Попап слайда
const photoPopup = new PopupWithImage(photoPopupSelector);
//Попап добавления карточки
const placePopup = new PopupWithForm(placePopupSelector, () => {
  event.preventDefault();
  const data = placePopup._getInputValues();
  cardRenderer(data);
  placeFormValidator.resetValidationErrors();
  placePopup.close();
});
//Попап редактирования профиля
const profilePopup = new PopupWithForm(profilePopupSelector, () => {
  event.preventDefault();
  const data = profilePopup._getInputValues();
  profile.setUserInfo(data.profilename, data.info);
  profilePopup.close();
});
//Включение валидации
const profileFormValidator = new FormValidator(validationParam, profileForm);
const placeFormValidator = new FormValidator(validationParam, placeForm);
//Класс профиля
const profile = new UserInfo(profileName, profileJob);

//Вызов методов
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
cardList.renderItems();

//Слушатели
placeFormCaller.addEventListener('click', openPlaceForm);
profileFormCaller.addEventListener('click', openProfileForm);
