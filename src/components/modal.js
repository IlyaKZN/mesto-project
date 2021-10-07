import { elFormClasses } from './constans.js';
import {toggleButtonState, hideInputError} from './validate.js';
import {addUserCard} from './card.js';
const editPopup = document.getElementById('editPopup');
const addPopup = document.getElementById('addPopup');
const imgPopup =  document.getElementById('imgPopup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const addForm = addPopup.querySelector('.popup__form');
const closeBtns = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
const editForm = editPopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileSubline = document.querySelector('.profile__subline');
const nameInput = editForm.querySelector('.popup__nameInput');
const jobInput = editForm.querySelector('.popup__jobInput');
const openImage = imgPopup.querySelector('.popup__img');
const imgSubtitle = imgPopup.querySelector('.popup__subtitle');
let activePopup;

//Функция отрытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  activePopup = popup;
  document.addEventListener('keydown',checkingPressedBtn);
  if (popup.querySelector(`${elFormClasses.formSelector}`)) {
    resetErrorForm(popup);
  }
}

//Функция скрытия ошибки валидации и активации кнопки submit
function resetErrorForm (popup) {
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
  openImage.setAttribute('src', data.link);
  openImage.setAttribute('alt', data.name);
  imgSubtitle.textContent = data.name;
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
  document.removeEventListener('keydown',checkingPressedBtn);
}
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
function checkingPressedBtn(evt) {
  if (evt.key === 'Escape') {
    closePopup(activePopup)
  }
}

//Функциональность кнопки "Сохранить"
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubline.textContent = jobInput.value;
  closePopup(evt.target.closest('.popup'));
}
editForm.addEventListener('submit', handleProfileFormSubmit);

//Добавление слушателя кнопке Добавить
addForm.addEventListener('submit', (evt) => addUserCard (evt));
