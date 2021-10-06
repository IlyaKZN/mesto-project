let activePopup;
import { editPopup, addPopup, imgPopup, editButton, addButton, addForm, closeBtns, popups, editForm, profileName, profileSubline, nameInput ,jobInput} from './constans.js';
import { elFormClasses } from './constans.js';
import {toggleButtonState, hideInputError} from './validate.js';
import {addUserCard} from './card.js';

//Функция отрытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  activePopup = popup;
  if (!popup.querySelector(`${elFormClasses.formSelector}`)) {
    return;
  }
  const formElement = popup.querySelector(`${elFormClasses.formSelector}`);
  const inputList = Array.from(formElement.querySelectorAll(`${elFormClasses.inputSelector}`));
  const buttonElement = formElement.querySelector(`${elFormClasses.submitButtonSelector}`);
  inputList.forEach((inputElement) => {
    toggleButtonState(inputList, buttonElement, elFormClasses);
    hideInputError(formElement, inputElement, elFormClasses);
  });
}

//Открытие попапа с изображением
export function handlePreviewPicture(data) {
  imgPopup.querySelector('.popup__img').setAttribute('src', data.link);
  imgPopup.querySelector('.popup__img').setAttribute('alt', data.name);
  imgPopup.querySelector('.popup__subtitle').textContent = data.name;
  openPopup(imgPopup);
}

//Установка слушателей на кнопки открытия попапов
addButton.addEventListener('click', function () {
  openPopup(addPopup);
});
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubline.textContent;
  openPopup(editPopup);
});

//Функция закрытия попапа
export function closePopup (popup) {
  popup.classList.remove('popup_opened');
};
//(По клику на кнопку)
closeBtns.forEach((closeButton) => {
  closeButton.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')));
});
//(По клику на оверлей)
popups.forEach ((item) => {
  item.addEventListener('mousedown', function (evt) {
    evt.stopPropagation();
    if (evt.target.classList.contains('popup')) {
      closePopup(item);
    }
  });
});
//(При нажатии клавиши ESC)
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(activePopup)
  }
});

//Функциональность кнопки "Сохранить"
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubline.textContent = jobInput.value;
  closePopup(evt.target.closest('.popup'));
};
editForm.addEventListener('submit', handleProfileFormSubmit);

//Добавление слушателя кнопке Добавить
addForm.addEventListener('submit', (evt) => addUserCard (evt));
