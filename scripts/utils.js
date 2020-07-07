//Константы для создания слайда
const slideImage = document.querySelector('.popup__image');
const slideTitle = document.querySelector('.popup__image-title');
const photoPopup = document.querySelector('.popup_type_photo');

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

export {closePopup, closeOnEscape, closeOnOverlay, openPopup, slideImage, slideTitle, photoPopup};
