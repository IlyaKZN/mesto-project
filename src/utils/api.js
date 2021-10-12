import { profileName,profileSubline } from "../components/modal.js";
import { addInitialCards, userId, getUserId } from "../components/card.js";
const profileImg = document.querySelector('.profile__image');

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-2',
  headers: {
    authorization: '730ca99a-ac7c-4aa7-96e3-78c3d89308e4',
    'Content-Type': 'application/json'
  }
}

//Запрос информации пользователя
const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
}

//Заполнение профиля пользователя
export const fillingUserProfile = () => {
  getUserInformation()
    .then(res => res.json())
    .then((res) => {
      getUserId(res._id);
      profileName.textContent = res.name;
      profileSubline.textContent = res.about;
      profileImg.src = res.avatar;
    })
}


//Запрос объекта с карточками
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
}

//Обновление данных пользователя
export const saveProfileData = (name, about) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.headers.authorization}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}

export const addNewCard = (name, link) => {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: `${config.headers.authorization}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  });
}

export const sendLikeCard = (evt, cardData) => {
  if (!evt.target.classList.contains('gallery__button-like_active')) {
    return fetch(`${config.baseUrl}/cards/likes/${cardData._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${config.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    });
  } else {
    return fetch(`${config.baseUrl}/cards/likes/${cardData._id}`, {
      method: 'PUT',
      headers: {
        authorization: `${config.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
