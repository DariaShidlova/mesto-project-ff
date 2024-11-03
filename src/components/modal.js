import { clearErrors } from "../index";

// Общая функция открытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');

    // Добавляем слушатель для закрытия по ESC
    document.addEventListener('keydown', closePopupByEsc);
}

// Общая функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc); // Удаление обработчика
}

// Функция для закрытия попапа по ESC
function closePopupByEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}