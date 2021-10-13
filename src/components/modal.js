import { elFormClasses } from './constans.js';
import { toggleButtonState, hideInputError} from './validate.js';
import { addUserCard, deleteCard } from './card.js';
import { saveProfileData, deleteCardReq, saveProfileAvatar } from '../utils/api.js';
export const avatarProfile = document.querySelector('.profile__image');
const editPopup = document.getElementById('editPopup');
const addPopup = document.getElementById('addPopup');
const imgPopup =  document.getElementById('imgPopup');
const avatarPopup = document.getElementById('avatarPopup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const addForm = addPopup.querySelector('.popup__form');
const closeBtns = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');
const editForm = editPopup.querySelector('.popup__form');
const avatarForm = avatarPopup.querySelector('.popup__form');
export const profileName = document.querySelector('.profile__name');
export const profileSubline = document.querySelector('.profile__subline');
const nameInput = editForm.querySelector('.popup__nameInput');
const jobInput = editForm.querySelector('.popup__jobInput');
const openImage = imgPopup.querySelector('.popup__img');
const imgSubtitle = imgPopup.querySelector('.popup__subtitle');
export const deletePopup = document.getElementById('deletePopup');
let activePopup;

//Функция отрытия попапа
export function openPopup (popup, cardData, evt) {
  //Установка слушателя на кнопку согласия с удалением карточки
  deletePopup.querySelector('.popup__save-button').addEventListener('click', () => {
    deleteCardReq(cardData)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
    deleteCard(evt);
    closePopup(popup);
  });
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

//Установка слушателя открытия попапа по клику на аватар
avatarProfile.addEventListener('click', () => {
  openPopup(avatarPopup);
})

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
  const firstValueBtn = evt.target.querySelector('.popup__save-button').textContent;
  renderLoading(true);
  saveProfileData(nameInput.value, jobInput.value)
    .then(res => {
      if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      profileName.textContent = res.name;
      profileSubline.textContent = res.about;
      closePopup(evt.target.closest('.popup'));
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, firstValueBtn);
    });
}
editForm.addEventListener('submit', handleProfileFormSubmit);

//Добавление слушателя кнопке Создать
addForm.addEventListener('submit', (evt) => addUserCard (evt));

//Функциональность кнопки "Сохранить" попапа изменения аватара
avatarForm.addEventListener('submit', (evt) => {
  changeAvatar(evt);
  avatarForm.reset();
})

//Функция изменения аватара
function changeAvatar (evt) {
  evt.preventDefault();
  const firstValueBtn = evt.target.querySelector('.popup__save-button').textContent;
  renderLoading(true);
  saveProfileAvatar(avatarForm.querySelector('.popup__field-text').value)
    .then(res => {
      if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      avatarProfile.style.backgroundImage = `url('${res.avatar}')`;
      closePopup(activePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, firstValueBtn);
    });
}

//Функция отрисовки процесса сохранения
export function renderLoading (isLoading, firstValueBtn) {
  const activeSaveButton = activePopup.querySelector('.popup__save-button');
  if (isLoading) {
    activeSaveButton.textContent = 'Сохранение...';
  } else {
    activeSaveButton.textContent = firstValueBtn;
  }
}
