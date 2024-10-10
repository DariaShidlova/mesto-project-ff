// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./cards";




// добавление карточки
function createCard(cardData, deleteCallback) {
    const template = document.querySelector('#card-template').content.querySelector('.places__item');
    const cardElement = template.cloneNode(true);

    // установка значений в карточке
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;

    cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback); 

    // обработчик для кнопки лайка
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    return cardElement;
}
//поиск элемента для отображения карточек
const cardList = document.querySelector('.places__list');

//добавление карточек на страницу
initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard);
    cardList.append(cardElement);
});

//удаление карточки
function deleteCard(event) {
    event.target.closest('.card').remove();
}



// Общая функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');

     // Добавляем слушатель для закрытия по ESC
     document.addEventListener('keydown', closePopupByEsc);
}

// Общая функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

// Закрытие попапов при нажатии на крестик
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Открытие попапа редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
editButton.addEventListener('click', () => {
//Подставляем текущее имя и описание в поля формы
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editPopup);
});

function handleFormSubmit(evt) {
    evt.preventDefault(); // Отмена стандартного поведения формы

    // Получаем значения полей из формы
    const newName = nameInput.value;
    const newJob = jobInput.value;

    // Вставляем новые значения в профиль
    profileTitle.textContent = newName;
    profileDescription.textContent = newJob;

    // Закрываем попап после сохранения
    closePopup(editPopup);
}

formElement.addEventListener('submit', handleFormSubmit);


// Открытие попапа добавления карточки
const addButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
addButton.addEventListener('click', () => openPopup(addCardPopup));

// Обработка формы добавления карточки
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const linkInput = newCardForm.querySelector('.popup__input_type_url');

newCardForm.addEventListener('submit', function(evt) {
    evt.preventDefault(); // Отмена стандартного поведения формы

    // Получаем значения полей из формы
    const cardData = {
        name: placeNameInput.value,
        link: linkInput.value
    };

    // Создаем и добавляем новую карточку в начало списка
    const newCardElement = createCard(cardData, deleteCard);
    cardList.prepend(newCardElement); // Добавляем карточку в начало списка

    // Закрываем попап и очищаем форму
    closePopup(addCardPopup);
    newCardForm.reset(); // Очищаем поля ввода формы
});






// Открытие попапа с картикой
function openImagePopup(imageSrc, caption) {
    const imagePopup = document.querySelector('.popup_type_image');
    const imageElement = imagePopup.querySelector('.popup__image');
    const captionElement = imagePopup.querySelector('.popup__caption');

    // Устанавливаем источник картинки и текст подписи
    imageElement.src = imageSrc;
    imageElement.alt = caption;
    captionElement.textContent = caption;

    // Открываем попап
    openPopup(imagePopup);
}

// Закрытие попапа при нажатии на оверлей
const popups = document.querySelectorAll('.popup');
popups.forEach(popup => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target === event.currentTarget) {
            closePopup(popup);
        }
    });
});


// Функция для закрытия попапа по ESC
function closePopupByEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}
