import {handlePreviewPicture, closePopup} from './modal.js';
import {initialCards} from './initial-сards.js';
import { galleryList, galleryTemplate, nameCard, urlCardImg, addForm} from './constans.js';

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
  function(evt) {
    evt.target.classList.toggle('gallery__button-like_active');
  });
  card.querySelector('.gallery__button-delete').addEventListener('click',
  function(evt1) {
    evt1.target.closest('li').remove();
  });
  return card;
}

//Функция добавления карточки на страницу
function addCard (cardData, cardContainer) {
  const card = createCard(cardData);
  cardContainer.prepend(card);
};

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
};
