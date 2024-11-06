// Проверка валидности каждого поля
function validateInput(inputElement, config) {
  const formElement = inputElement.closest(config.formSelector);
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);

    if (!inputElement.validity.valid) {
      if (inputElement.validity.valueMissing) {
        errorElement.textContent = 'Вы пропустили это поле.';
      } else if (inputElement.validity.tooShort) {
        errorElement.textContent = `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${inputElement.value.length} символ.`;
      } else if (inputElement.validity.tooLong) {
        errorElement.textContent = `Максимальное количество символов: ${inputElement.maxLength}. Длина текста сейчас: ${inputElement.value.length} символ.`;
      } else if (inputElement.validity.typeMismatch) {
        errorElement.textContent = inputElement.dataset.errorType;
      }
    } else {
      errorElement.textContent = '';
    }
  
    // Добавляем или убираем класс для выделения поля с ошибкой
    errorElement.classList.toggle(config.errorClass, !inputElement.validity.valid);
    inputElement.classList.toggle(config.inputErrorClass, !inputElement.validity.valid);
  }
  
  // Переключение состояния кнопки отправки
function toggleButtonState(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const isFormValid = formElement.checkValidity();

  buttonElement.disabled = !isFormValid;
  buttonElement.classList.toggle(config.inactiveButtonClass, !isFormValid);
}
  
  // Установка слушателей на поля формы
  function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

    toggleButtonState(formElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInput(inputElement, config);
            toggleButtonState(formElement, config);
        });
    });
}
  
  // Очистка ошибок валидации
  function clearValidation(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
  
    inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
      errorElement.textContent = '';
      errorElement.classList.remove('popup__error_visible');
      inputElement.classList.remove('popup__input_type_error');
    });
  
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  }
  
  // Включение валидации для всех форм на странице
  function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
}

  export { enableValidation, clearValidation};
  