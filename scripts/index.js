import { initialCards } from './initialCards.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

//    CONSTANTS
//  переменные для попапа редактирования профиля
const buttonOpenProfilePopup = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#editButton');
const buttonCloseProfilePopup = document.querySelector('.popup__close-button_profile');
const profileInfoNameEl = document.querySelector('.profile__info-name');
const profileInfoProfessionEl = document.querySelector('.profile__info-profession');
const nameInputProfilePopup = document.querySelector('.popup__input_value_name');
const professionInputProfilePopup = document.querySelector('.popup__input_value_profession');
const formProfilePopup = document.querySelector('#formProfile');
const buttonSaveProfilePopup = document.querySelector('#saveButton');
//  переменные для попапа с картинкой
const imagePopup = document.querySelector('#popupImage');                           
const buttonCloseImagePopup = document.querySelector('.popup__close-button_picture');     
const bigPicrure = document.querySelector('.popup__picture');                       
const bigPictureName = document.querySelector('.popup__name');                     
//  переменные для добавления 6 стандартных карточек карточек 
const templateCards = document.querySelector('.elements');             
// переменные для попапа новых карточек
const buttonOpenCardPopup = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('#addButton');
const buttonCloseCardPopup = document.querySelector('.popup__close-button_add');
const buttonAddNewCard = document.querySelector('#addCardButton');
// переменные для добавления новой карточки
const nameInputCardPopup = document.querySelector('.popup__input_value_name-card');             
const linkInputCardPopup = document.querySelector('.popup__input_value_picture-card');   
const formCardPopup = document.querySelector('#formCard')                  

//объект свойств для валидации
const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup_button_inactive',
  inputErrorClass: 'popup_input-error',
  errorClass: 'form__input-error_active'
};

//-------------------------------------------------------------------------------------------//

//    ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ
//  POPUP ДЛЯ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
buttonOpenProfilePopup.addEventListener('click', () => {
	  popupEditForm.resetValidation();
    openPopup(editPopup);
    valuesInput();                                                                           
});

buttonCloseProfilePopup.addEventListener('click', () => closePopup(editPopup));

//  ф-я, которая задает значения инпутам, при открытии попапа
function valuesInput() {
    nameInputProfilePopup.value = profileInfoNameEl.textContent;               
    professionInputProfilePopup.value = profileInfoProfessionEl.textContent;   
};

//   ф-я, сохраняющая обновленные данные профайла
formProfilePopup.addEventListener('submit', function(event) {
    event.preventDefault();                                           

    profileInfoNameEl.textContent = nameInputProfilePopup.value;                
    profileInfoProfessionEl.textContent = professionInputProfilePopup.value;

    closePopup(editPopup);                                          
});

//   POPUP ДЛЯ ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК
buttonOpenCardPopup.addEventListener('click', () => {
  popupAddform.resetValidation();
  formCardPopup.reset();
  buttonAddNewCard.classList.add(validation.inactiveButtonClass);
  openPopup(cardPopup);
});

buttonCloseCardPopup.addEventListener('click', () => closePopup(cardPopup));

//  POPUP С КАРТИНКОЙ
export function openPicturePopup(name, link) {
  bigPicrure.src = link;                                      
  bigPictureName.textContent = name;
  openPopup(imagePopup);  
}

buttonCloseImagePopup.addEventListener('click', function() {      
    closePopup(imagePopup);                             
});

//  ф-я (УНИВЕРСАЛЬНАЯ) открытия попапа
function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');                        
  document.addEventListener('keydown', closePopupByEsc);        
  document.addEventListener('click', closePopupByOverlay);      
};

//  ф-я (УНИВЕРСАЛЬНАЯ) закрытия попапа
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
formCardPopup.addEventListener('submit', (evt) => {                                     
  evt.preventDefault();                                                          
  closePopup(cardPopup);                            

  const addNewCard = ({                
      name: nameInputCardPopup.value,                      
      link: linkInputCardPopup.value                 
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
const popupEditForm = new FormValidator(validation, formProfilePopup);
popupEditForm.enableValidation();

const popupAddform = new FormValidator(validation, formCardPopup);
popupAddform.enableValidation();