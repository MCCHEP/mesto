

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => { this._likeImage(); } );
    this._deleteButton.addEventListener('click', () => { this._deleteCard(); });
    this._cardImage.addEventListener('click', () => { this._handleCardClick(this._link, this._name); });
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
