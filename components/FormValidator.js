export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(config.inputSelector));
    this._buttonElement = this._form.querySelector(config.submitButtonSelector);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._inputErrorClass = config.inputErrorClass;
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    this._errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    this._errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidationErrors() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };
}

