//Данные пользователя
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-2',
  headers: {
    authorization: '730ca99a-ac7c-4aa7-96e3-78c3d89308e4',
    'Content-Type': 'application/json'
  }
}

//Запрос информации пользователя
export const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
  .then(getResponseData);
}

//Запрос объекта с карточками
export const getInitialCards = (we) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
  .then(getResponseData);
}

//Обновление данных пользователя
export const saveProfileData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.headers.authorization}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(getResponseData);
}

//Отправляем запрос на обновление аватара пользователя
export const saveProfileAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `${config.headers.authorization}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(getResponseData);
}


//Отправляем запрос на установку(снятие) лайка с карточки
export const sendLikeCard = (evt, cardData) => {
  if (evt.target.classList.contains('gallery__button-like_active')) {
    return fetch(`${config.baseUrl}/cards/likes/${cardData._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${config.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    })
    .then(getResponseData);
  } else {
    return fetch(`${config.baseUrl}/cards/likes/${cardData._id}`, {
      method: 'PUT',
      headers: {
        authorization: `${config.headers.authorization}`,
        'Content-Type': 'application/json'
      }
    })
    .then(getResponseData);
  }
}

//Отправляем запрос на удаление карточки пользователя
export const deleteCardReq = (cardData) => {
  return fetch(`${config.baseUrl}/cards/${cardData._id}`, {
    method: 'DELETE',
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
  .then(getResponseData)
}


//Отправляем запрос на добавление карточки
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: `${config.headers.authorization}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(getResponseData);
}


//Проверка состояния промисса
const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  } else {
    return res.json();
  }
}
