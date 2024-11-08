import { likeCard, dislikeCard } from "./api";

// Создание карточки
export function createCard(cardData, deleteCardCallback, openImagePopup, toggleLikeCallback, userId) {
  const template = document.querySelector('#card-template').content.querySelector('.places__item');
  const cardElement = template.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCountElement = cardElement.querySelector('.card__likes-count');

  // Настройка карточки
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  // Установка количества лайков
  const isLikedByUser = cardData.likes.some((like) => like._id === userId);
  likeCountElement.textContent = cardData.likes.length;
  likeButton.classList.toggle('card__like-button_is-active', isLikedByUser);

  // Удаление карточки только если она принадлежит пользователю
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener('click', () => deleteCardCallback(cardData._id, cardElement));
  } else {
    deleteButton.style.display = 'none';
  }

  // Лайк/дизлайк
  likeButton.addEventListener('click', (event) => toggleLikeCallback(cardData._id, likeButton, likeCountElement));

  // Открытие попапа с изображением
  cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

  return cardElement;
}

// Удаление карточки из DOM
export function deleteCard(cardElement) {
  cardElement.remove();
}
