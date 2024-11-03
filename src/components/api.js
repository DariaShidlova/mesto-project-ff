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
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }
  
  // Загрузка данных пользователя
  export function getUserInfo() {
    return request(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    });
  }
  
  // Загрузка начальных карточек
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
      headers: config.headers,  // Передаем headers из config
      body: JSON.stringify({ name, about }) // Передаем name и about как JSON в теле
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
  