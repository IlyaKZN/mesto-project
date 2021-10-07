import {handlePreviewPicture, closePopup} from './modal.js';
import {initialCards} from './initial-сards.js';
const galleryList = document.querySelector('.gallery__list');
const galleryTemplate = document.querySelector('#gallery').content;
const addForm = addPopup.querySelector('.popup__form');
const nameCard = addForm.querySelector('[name="name"]');
const urlCardImg = addForm.querySelector('[name="subline"]');

//Функция создания карточки
function createCard(cardData) {
  const card = galleryTemplate.querySelector('.gallery__item').cloneNode(true);
  const title = card.querySelector('.gallery__title');
  title.textContent = cardData.name;
  const elementImage = card.querySelector('.gallery__img');
  elementImage.setAttribute('src', cardData.link);
  elementImage.setAttribute('alt', cardData.name);
  elementImage.addEventListener('click', () =>
    handlePreviewPicture(cardData)
  );
  card.querySelector('.gallery__button-like').addEventListener('click',
  likeCard);
  card.querySelector('.gallery__button-delete').addEventListener('click',
  deleteCard);
  return card;
}

//Функция установки и снятия лайка с карточки
function likeCard (evt) {
  evt.target.classList.toggle('gallery__button-like_active');
}

//Функция удаления карточки
function deleteCard (evt) {
  evt.target.closest('li').remove();
}

//Функция добавления карточки на страницу
function addCard (cardData, cardContainer) {
  const card = createCard(cardData);
  cardContainer.prepend(card);
}

//Фунция добавления карточки пользователя
export function addUserCard (evt) {
  evt.preventDefault();
  closePopup(evt.target.closest('.popup'));
  addCard({
    name: nameCard.value,
    link: urlCardImg.value
  }, galleryList);
  addForm.reset();
}

//Карточки из коробки
export function addInitialCards () {
    initialCards.forEach ((item) => {
    addCard(item, galleryList);
  });
}
