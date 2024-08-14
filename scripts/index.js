// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


// добавление карточки
function createCard(cardData) {
    const template = document.querySelector('#card-template').content;
    const cardElement = template.cloneNode(true); //копирование контента

    // установка значений в карточке
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return cardElement;
}

const cardList = document.querySelector('.places__list'); //поиск элемента для отображения карточек

//добавление карточек на страницу
initialCards.forEach(cardData => {
    const cardElement = createCard(cardData);
    cardList.append(cardElement);
});

// удаление карточки
function deleteCard(event) {
    event.target.closest('.card').remove();
}