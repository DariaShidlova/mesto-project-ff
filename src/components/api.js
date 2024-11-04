const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
    headers: {
      authorization: 'a353cc74-1664-4076-a504-c74290095ef5',
      'Content-Type': 'application/json'
    }
  }
  
  // Функция для выполнения запросов с проверкой ответа
  function request(url, options) {
    return fetch(url, options)
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then(data => {
        return data; // возвращает объект с данными, включая userId или другие поля
      });
  }
  
  // Загрузка данных пользователя
  export function getUserInfo() {
    return request(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    });
  }
  
  // Загрузка карточек
  export function getInitialCards() {
    return request(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
    });
  }
  
  // Обновление профиля
  export function updateUserProfile(name, about) {
    return request(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers, 
      body: JSON.stringify({ name, about })
    });
  }
  
  // Добавление новой карточки
  export function addNewCard(name, link) {
    return request(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,  // Передаем headers из config
      body: JSON.stringify({ name, link }) // Передаем name и link как JSON в теле
    });
  }
  
//   // Удаление карточки
export function deleteCardAPI(cardId) {
    return request(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    });
}

export function likeCard(cardId) {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    });
}

export function dislikeCard(cardId) {
    return request(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    });
}

export function changeAvatar(avatar) {
    return request(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers, 
        body: JSON.stringify({ avatar })} 
    )
}