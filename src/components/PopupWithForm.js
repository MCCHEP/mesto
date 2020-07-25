import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-button');
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._handleFormSubmit);
  }
  indicateFormLoading() {
    this._submitButton.textContent = 'Сохранение...';
  }

  revertButton() {
    this._submitButton.textContent = 'Сохранить';
  }

  open() {
    this.revertButton();
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
