// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { createCard } from "./components/cards.js";
import { deleteCard } from "./components/cards.js";
import { openPopup, closePopup } from "./components/modal.js";
import { initialCards } from "./components/cards";

// объявление глобальных переменных
const cardList = document.querySelector('.places__list');
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const closeButtons = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.querySelector('.popup__form[name="new-place"]');
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const linkInput = newCardForm.querySelector('.popup__input_type_url');
const popups = document.querySelectorAll('.popup');

//добавление карточек на страницу
initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard);
    cardList.append(cardElement);
});

// Закрытие попапов при нажатии на крестик
closeButtons.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


// Открытие попапа редактирования профиля
editButton.addEventListener('click', () => {
    //Подставляем текущее имя и описание в поля формы
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editPopup);
});

// функция редактирования профиля
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
addButton.addEventListener('click', () => openPopup(addCardPopup));

// Обработка формы добавления карточки
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

// Закрытие попапа при нажатии на оверлей
popups.forEach(popup => {
    popup.addEventListener('mousedown', (event) => {
        if (event.target === event.currentTarget) {
            closePopup(popup);
        }
    });
});

