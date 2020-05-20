// Находим форму в DOM
const formElement = document.querySelector('.form');
const formCaller = document.querySelector('.profile__edit-button');
const formCloser = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const nameInput = formElement.querySelector('.form__input_type_name');
const jobInput = formElement.querySelector('.form__input_type_occupation');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__occupation');

function openClosePopup() {
    if (popup.classList.contains('popup_opened') === false) {
        nameInput.value = profileName.textContent; 
        jobInput.value = profileJob.textContent;
    } 
    popup.classList.toggle('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    openClosePopup();
}

//Слушатели закрытия/открытия, отправки формы
formCaller.addEventListener('click', openClosePopup);
formCloser.addEventListener('click', openClosePopup);
formElement.addEventListener('submit', formSubmitHandler);