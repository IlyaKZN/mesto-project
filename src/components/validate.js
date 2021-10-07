//Запуск валидации, установка слушателей на формы
export const enableValidation = (elFormClasses) => {
  const formList = Array.from(document.querySelectorAll(`${elFormClasses.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, elFormClasses);
  });
}

//Установка слушателей на элементы формы
const setEventListeners = (formElement, elFormClasses) => {
  const inputList = Array.from(formElement.querySelectorAll(`${elFormClasses.inputSelector}`));
  const buttonElement = formElement.querySelector(`${elFormClasses.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, elFormClasses);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, elFormClasses);
      toggleButtonState(inputList, buttonElement, elFormClasses);
    });
  });
};

//Проверка элементов формы на валидность
const checkInputValidity = (formElement, inputElement, elFormClasses) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, elFormClasses);
  } else {
    hideInputError(formElement, inputElement, elFormClasses);
  }
};

//Функция отображения сообщения об ошибке
const showInputError = (formElement, inputElement, errorMessage, elFormClasses) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${elFormClasses.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${elFormClasses.errorClass}`);
};

//Функция скрытия сообщения об ошибке
export const hideInputError = (formElement, inputElement, elFormClasses) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${elFormClasses.inputErrorClass}`);
  errorElement.classList.remove(`${elFormClasses.errorClass}`);
  errorElement.textContent = '';
};

//Проверка формы на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//Включение-отключение кнопки submit
export const toggleButtonState = (inputList, buttonElement, elFormClasses) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${elFormClasses.inactiveButtonClass}`);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(`${elFormClasses.inactiveButtonClass}`);
    buttonElement.disabled = false;
  }
};
