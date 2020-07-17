export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this.close = this.close.bind(this);
    this._closeOnOverlay = this._closeOnOverlay.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose() {

    if (event.key === 'Escape') {
      this.close();
    }
  }

  _closeOnOverlay() {
    if (event.target.classList.contains('popup')) {
      this.close();
    }

  }

  setEventListeners() {
    this._popup.addEventListener('click', this._closeOnOverlay);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close);
  }

  _removeEventListeners() {
    this._popup.removeEventListener('click', this._closeOnOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.querySelector('.popup__close-button').removeEventListener('click', this.close);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }
}
