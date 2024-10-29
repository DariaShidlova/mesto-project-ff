// Импорт функций открытия и закрытия попапов
import { openPopup } from './modal';

// добавление карточки
export function createCard(cardData, deleteCallback, openImagePopup, toggleLike) {
    const template = document.querySelector('#card-template').content.querySelector('.places__item');
    const cardElement = template.cloneNode(true);

    // установка значений в карточке
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__title').textContent = cardData.name;
    //   cardElement.querySelector('.card__image').src = cardData.link;
    //   cardElement.querySelector('.card__image').alt = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);


    // Обработчик для кнопки лайка
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', toggleLike);

    return cardElement;
}

//удаление карточки
export function deleteCard(event) {
    event.target.closest('.card').remove();
}