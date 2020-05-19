// Находим форму в DOM
const formElement = document.querySelector('.profile-edit-form');
const formCaller = document.querySelector('.profile__edit-button');
const formCloser = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');

function popupOpener() {
    popup.classList.add('popup_opened'  );
}

function popupCloser() {
    popup.classList.remove('popup_opened');
}

formCaller.addEventListener('click', popupOpener);
formCloser.addEventListener('click', popupCloser);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Находим поля формы в DOM
    const nameInput = formElement.querySelector('.profile-edit-form__input_type_name');
    const jobInput = formElement.querySelector('.profile-edit-form__input_type_occupation');

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileName = document.querySelector('.profile__name');
    const profileJob = document.querySelector('.profile__occupation');


    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupCloser();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
