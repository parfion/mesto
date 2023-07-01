import { validation } from './FormValidator.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

//    CONSTANTS
//  переменные для попапа редактирования профиля
const profileEditButtonEl = document.querySelector('.profile__edit-button');
const editPopupEl = document.querySelector('#editButton');
const popupCloseButtonEl = document.querySelector('.popup__close-button');
const profileInfoNameEl = document.querySelector('.profile__info-name');
const popupNameEl = document.querySelector('.popup__input_value_name');
const profileInfoProfessionEl = document.querySelector('.profile__info-profession');
const popupProfessionEl = document.querySelector('.popup__input_value_profession');
const popupFormEl = document.querySelector('#formProfile');
const saveButton = document.querySelector('#saveButton');
//  переменные для попапа с картинкой
const popupImage = document.querySelector('#popupImage');                           
const closeBigPicture = document.querySelector('.popup__close-button_picture');     
const bigPicrure = document.querySelector('.popup__picture');                       
const bigPictureName = document.querySelector('.popup__name');                     
//  переменные для добавления 6 стандартных карточек карточек 
const templateCards = document.querySelector('.elements');             
const templateContent = templateCards.content;                         
const templateCard = templateContent.querySelector('.element');  
// переменные для попапа новых карточек
const profileAddButtonEl = document.querySelector('.profile__add-button');
const addPopupEl = document.querySelector('#addButton');
const closeButtonAdd = document.querySelector('.popup__close-button_add');
const addCardButton = document.querySelector('#addCardButton');
// переменные для добавления новой карточки
const nameCard = document.querySelector('.popup__input_value_name-card');             
const picturelinkCard = document.querySelector('.popup__input_value_picture-card');   
const formCards = document.querySelector('#formCard')                  
//  массив 6 стандартных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

//-------------------------------------------------------------------------------------//

//    ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ
//  ОТКРЫТИЕ И ЗАКРЫТИЕ POPUP ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
profileEditButtonEl.addEventListener('click', () => {
	popupEditForm.resetFormProfile(popupNameEl, saveButton);
	popupEditForm.resetFormProfile(popupProfessionEl, saveButton);
    openPopup(editPopupEl);
    valuesInput();                                                                           
});

popupCloseButtonEl.addEventListener('click', () => closePopup(editPopupEl));

//  ф-я, которая задает значения инпутам, при открытии попапа
function valuesInput() {
    popupNameEl.value = profileInfoNameEl.textContent;               
    popupProfessionEl.value = profileInfoProfessionEl.textContent;   
};

//   ф-я отправки формы на сервер
popupFormEl.addEventListener('submit', function(event) {
    event.preventDefault();                                           

    profileInfoNameEl.textContent = popupNameEl.value;                
    profileInfoProfessionEl.textContent = popupProfessionEl.value;

    closePopup(editPopupEl);                                          
});

//   ОТКРЫТИЕ И ЗАКРЫТИЕ POPUP ДЛЯ ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК
profileAddButtonEl.addEventListener('click', () => {
  popupAddform.resetFormCard(nameCard, addCardButton);
  popupAddform.resetFormCard(picturelinkCard, addCardButton);
  formCards.reset();
  openPopup(addPopupEl);
});

closeButtonAdd.addEventListener('click', () => closePopup(addPopupEl));

//  ОТКРЫТИЕ И ЗАКРЫТИЕ POPUP С КАРТИНКОЙ
export function openPicturePopup(name, link) {
  bigPicrure.src = link;                                      
  bigPictureName.textContent = name;
  openPopup(popupImage);  
}

closeBigPicture.addEventListener('click', function() {      
    closePopup(popupImage);                             
});

//  ф-я (УНИВЕРСАЛЬНАЯ) открытия любого из попапов
function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');                        
  document.addEventListener('keydown', closePopupByEsc);        
  document.addEventListener('click', closePopupByOverlay);      
};

//  ф-я (УНИВЕРСАЛЬНАЯ) закрытия любого из попапов
function closePopup(popupEl) {
  popupEl.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);         
  document.removeEventListener('click', closePopupByOverlay);
}

// --------------------------------------------------------------------------------------- //

//  добавление 6 стандартных карточек
initialCards.forEach((item) => {
  // Создадим экземпляр карточки, передаём селектор темплейта при создании
  const card = new Card(item, '.elements');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  
  // Добавляем в DOM
  document.querySelector('.elements').append(cardElement);
}) 

//     ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
formCards.addEventListener('submit', (evt) => {                                     
  evt.preventDefault();                                                          
  closePopup(addPopupEl);                            

  const addNewCard = ({                
      name: nameCard.value,                      
      link: picturelinkCard.value                 
  });

  const newCard = new Card(addNewCard, '.elements');
  const newCardElement = newCard.generateCard();

  templateCards.prepend(newCardElement);              
  evt.target.reset();
});

//------------------------------------------------------------------------------------- //

//  ЗАКРЫТИЕ ПОПАПОВ НА ESC
//  ф-я закрытия попапа на Esc (вызываю ее при открытии и закрытии попапа)
function closePopupByEsc(evt) {
	const openedPopup = document.querySelector('.popup_opened');        
    if (evt.key === 'Escape') {                                         
      closePopup(openedPopup);                                          
    };
  };

//  ЗАКРЫТИЕ ПОПАПОВ НА OVERLAY
//  ф-я закрытия попапа на Overlay (вызываю ее при открытии и закрытии попапа)
function closePopupByOverlay() {
	const openedPopup = document.querySelector('.popup_opened');
  	openedPopup.addEventListener("click", (evt) => {                  
    	if (evt.currentTarget === evt.target) {                         
      		closePopup(openedPopup);                                      
    	};
  	});
};

//-------------------------------------------------------------------------------------//
//ВАЛИДАЦИЯ форм
const popupEditForm = new FormValidator(validation, popupFormEl);
popupEditForm.enableValidation();

const popupAddform = new FormValidator(validation, formCards);
popupAddform.enableValidation();
