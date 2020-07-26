

export default class Card {
  constructor(data, cardSelector, myId, handleImageClick, handleLikeClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._myId = myId;
    this._cardOwnerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
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

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => { this._handleLikeClick(this._cardId, this._likeButton, this._likeCounter); });
    this._deleteButton.addEventListener('click', () => { this._handleDeleteClick(this._element, this._cardId); });
    this._cardImage.addEventListener('click', () => { this._handleImageClick(this._link, this._name); });
  }

  _checkMyLikes(myId) {
    let result = this._likes.find(element => {
      return element._id === myId;
    });
    if (result) {
      return true;
    }
    else {
      return false;
    }
  }

  _checkCardOwner(owner) {
    return this._cardOwnerId !== owner;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector('.element__image-title');
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._deleteButton = this._element.querySelector('.element__delete-button');

    if (this._checkCardOwner(this._myId)) {
      this._deleteButton.remove();
    }
    if (this._checkMyLikes(this._myId)) {
      this._likeButton.classList.add('element__like-button_active');
    }

    this._setEventListeners();
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCounter.textContent = this._likes.length;
    return this._element;
  }
}
