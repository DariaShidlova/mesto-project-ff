// Импорт функций открытия и закрытия попапов
import { openPopup } from "../components/modal";
import { likeCard, dislikeCard } from "./api";

// добавление карточки
export function createCard(cardData, deleteCallback, openImagePopup, toggleLike, userId) {
    const template = document.querySelector('#card-template').content.querySelector('.places__item');
    const cardElement = template.cloneNode(true);

    // установка значений в карточке
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));
    //запрещает удаления чужих карточек
   const deleteButton = cardElement.querySelector('.card__delete-button');
    if (cardData._id === userId) {
        deleteButton.addEventListener('click', deleteCallback);
    } else {
        deleteButton.style.display = 'none';
    }

   // Устанавливаем количество лайков
   const likeCountElement = cardElement.querySelector('.card__likes-count');
   const likes = Array.isArray(cardData.likes) ? cardData.likes : []; // Проверяем и устанавливаем массив лайков
   likeCountElement.textContent = likes.length; // Устанавливаем количество лайков

   // Обработчик для кнопки лайка
   const likeButton = cardElement.querySelector('.card__like-button');
   likeButton.classList.toggle('card__like-button_is-active', likes.some(like => like._id === userId));

   likeButton.addEventListener('click', (event) => {
    console.log("Card ID:", cardData._id);
    toggleLike(event, cardData._id, likeCountElement);
});
    return cardElement;
}

//удаление карточки
export function deleteCard(event) {
    event.target.closest('.card').remove();
}



