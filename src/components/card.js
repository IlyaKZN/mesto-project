import {handlePreviewPicture, closePopup} from './modal.js';
import { getInitialCards, addNewCard, sendLikeCard } from '../utils/api.js';
const galleryList = document.querySelector('.gallery__list');
const galleryTemplate = document.querySelector('#gallery').content;
const addForm = addPopup.querySelector('.popup__form');
const nameCard = addForm.querySelector('[name="name"]');
const urlCardImg = addForm.querySelector('[name="subline"]');
export let userId = '';


//Запишем id активного пользователя
export const getUserId = (id) => {
  userId = id;
}

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
  card.querySelector('.gallery__button-like').addEventListener('click', (evt) => likeCard(evt, cardData));
  card.querySelector('.gallery__button-delete').addEventListener('click',
  deleteCard);
  card.querySelector('.gallery__like-counter').textContent = cardData.likes.length;
  if (cardData.owner._id === userId) {
    card.querySelector('.gallery__button-delete').classList.add('gallery__button-delete_active');
  }
  cardData.likes.forEach((el) => {
    if(el._id === userId) {
      card.querySelector('.gallery__button-like').classList.add('gallery__button-like_active');
    }
  })
  return card;
}

//Функция установки и снятия лайка с карточки
function likeCard (evt, cardData) {
  evt.target.classList.toggle('gallery__button-like_active');
  sendLikeCard(evt, cardData)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      evt.target.parentNode.querySelector('.gallery__like-counter').textContent = res.likes.length;
    })
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
  addNewCard(nameCard.value, urlCardImg.value);
  addForm.reset();
}

//Отрисовка карточек с сервера
function addInitialCards (cardData) {
    cardData.forEach ((item) => {
    addCard(item, galleryList);
  });
}

//Получение массива карточек
export const getArrayCards = () => {
  getInitialCards()
    .then(res => res.json())
    .then((res) => {
      addInitialCards(res);
    })
}
