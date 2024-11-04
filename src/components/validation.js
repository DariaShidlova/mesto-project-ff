// Проверка валидности каждого поля
function validateInput(inputElement) {
    const errorElement = inputElement.closest('form').querySelector(`#${inputElement.name}-error`);
  
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
    errorElement.classList.toggle('popup__error_visible', !inputElement.validity.valid);
    inputElement.classList.toggle('popup__input_type_error', !inputElement.validity.valid);
  }
  
  // Переключение состояния кнопки отправки
  function toggleButtonState(formElement) {
    const buttonElement = formElement.querySelector('.popup__button');
    const isFormValid = formElement.checkValidity();
  
    buttonElement.disabled = !isFormValid;
    buttonElement.classList.toggle('popup__button_disabled', !isFormValid);
  }
  
  // Установка слушателей на поля формы
  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  
    toggleButtonState(formElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        validateInput(inputElement);
        toggleButtonState(formElement);
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
  function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  }

  function renderLoading(isLoading, buttonElement, buttonText = 'Сохранить') {
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...';
    } else {
        buttonElement.textContent = buttonText;
    }
}

  
  export { enableValidation, clearValidation, renderLoading };
  