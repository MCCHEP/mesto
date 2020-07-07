import {slideImage, slideTitle, photoPopup, openPopup} from "./utils.js";

export default class Card {
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
