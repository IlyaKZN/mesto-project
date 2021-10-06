export const galleryList = document.querySelector('.gallery__list');
export const galleryTemplate = document.querySelector('#gallery').content;
export const editPopup = document.getElementById('editPopup');
export const addPopup = document.getElementById('addPopup');
export const imgPopup =  document.getElementById('imgPopup');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const addForm = addPopup.querySelector('.popup__form');
export const closeBtns = document.querySelectorAll('.popup__close-button');
export const popups = document.querySelectorAll('.popup');
export const editForm = editPopup.querySelector('.popup__form');
export const profileName = document.querySelector('.profile__name');
export const profileSubline = document.querySelector('.profile__subline');
export const nameInput = editForm.querySelector('.popup__nameInput');
export const jobInput = editForm.querySelector('.popup__jobInput');
export const nameCard = addForm.querySelector('[name="name"]');
export const urlCardImg = addForm.querySelector('[name="subline"]');
//Названия классов элементов формы
export const elFormClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__field-text_type_error',
  errorClass: 'form__input-error_active'
}

