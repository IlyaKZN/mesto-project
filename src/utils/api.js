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
  });
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
  });
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
  });
}

//Отправляем запрос на установку(снятие) лайка с карточки
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

//Отправляем запрос на удаление карточки пользователя
export const deleteCardReq = (cardData) => {
  return fetch(`${config.baseUrl}/cards/${cardData._id}`, {
    method: 'DELETE',
    headers: {
      authorization: `${config.headers.authorization}`
    }
  })
}
