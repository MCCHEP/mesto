
import './index.css'; // добавьте импорт главного файла стилей
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
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
  jobInput,
  confirmPopupSelector,
  avatarFormCaller,
  avatarEditForm,
  avatarPopupSelector,
  avatarLinkInput,
  avatarImage
} from "../utils/constants.js";

let cardList;

//Функции
//Колбэк слайда
const handleImageClick = (link, name) => { photoPopup.open(link, name); };
//Колбэк лайка
const handleLikeClick = (cardId, likeButton, likeCounter) => {
  const likeElement = likeCounter;
  if (likeButton.classList.contains('element__like-button_active')) {
    mestoApi.dislike(cardId)
      .then((data) => { likeElement.textContent = data.likes.length })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    likeButton.classList.remove('element__like-button_active');
  } else {
    mestoApi.like(cardId)
      .then((data) => { likeElement.textContent = data.likes.length })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    likeButton.classList.add('element__like-button_active');
  }
};

const handleDeleteClick = (item, id) => {
  const thisItem = item;
  const thisItemId = id;
  const confirmPopup = new PopupWithConfirm(confirmPopupSelector, () => {
    event.preventDefault();
    mestoApi.deleteCard(thisItemId)
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    thisItem.remove();
    confirmPopup.close();
  });
  confirmPopup.open();
};

//Колбэк создания карточки
const cardRenderer = (data) => {
  const card = new Card(data, '.card-template', handleImageClick, handleLikeClick, handleDeleteClick);
  const cardElement = card.generateCard();
  cardList.setItem(cardElement);
}

//Заполнение формы со страницы
const fillFromPage = (name, info) => {
  nameInput.value = name;
  jobInput.value = info;
};

const fillAvatarLink = (link) => {
  avatarLinkInput.value = link;
}

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

const openAvatarForm = () => {
  fillAvatarLink(avatarImage.src);
  avatarFormValidator.resetValidationErrors();
  avatarPopup.open();
}

//Создание экземпляров классов
//Api
const mestoApi = new Api({
  link: 'https://mesto.nomoreparties.co',
  groupId: 'cohort-13',
  headers: {
    authorization: '072afc53-82e4-4aa4-b920-dd02ed4506a2',
    'Content-Type': 'application/json'
  }
});

//Класс профиля
const profile = new UserInfo(profileName, profileJob);

//Попап слайда
const photoPopup = new PopupWithImage(photoPopupSelector);
//Попап добавления карточки
const placePopup = new PopupWithForm(placePopupSelector, () => {
  event.preventDefault();
  const data = placePopup._getInputValues();
  placePopup.indicateFormLoading();
  mestoApi.createCard(data.name, data.link)
    .then((data) => {
      cardRenderer(data);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  placeFormValidator.resetValidationErrors();
  placePopup.close();
});

//Попап редактирования профиля
const profilePopup = new PopupWithForm(profilePopupSelector, () => {
  event.preventDefault();
  profilePopup.indicateFormLoading();
  const data = profilePopup._getInputValues();
  mestoApi.updateProfile(data.profilename, data.info)
    .then((data) => {
      profile.setUserInfo(data.name, data.about);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  profilePopup.close();
});

//Попап изменения аватара
const avatarPopup = new PopupWithForm(avatarPopupSelector, () => {
  event.preventDefault();
  avatarPopup.indicateFormLoading();
  const data = avatarPopup._getInputValues();
  mestoApi.updateAvatar(data.avatarLink)
    .then((data) => {
      avatarImage.src = data.avatar;
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  avatarPopup.close();
});

//Валидаторы
const profileFormValidator = new FormValidator(validationParam, profileForm);
const placeFormValidator = new FormValidator(validationParam, placeForm);
const avatarFormValidator = new FormValidator(validationParam, avatarEditForm);



//Вызов методов
//Создание карточек на странице
mestoApi.getInitalCards()
  .then((data) => {
    cardList = new Section({
      data: data,
      renderer: cardRenderer
    }, cardListSelector);
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//Загрузка информации профиля
mestoApi.getProfileData()
  .then((result) => {
    profile.setUserInfo(result.name, result.about);
    avatarImage.src = result.avatar;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//Включение валидации
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();


//Слушатели
placeFormCaller.addEventListener('click', openPlaceForm);
profileFormCaller.addEventListener('click', openProfileForm);
avatarFormCaller.addEventListener('click', openAvatarForm);



