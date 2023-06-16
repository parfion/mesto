//  переменные для попапа редактирования профиля
const profileEditButtonEl = document.querySelector('.profile__edit-button');
const editPopupEl = document.querySelector('#editButton');
const popupCloseButtonEl = document.querySelector('.popup__close-button');
const profileInfoNameEl = document.querySelector('.profile__info-name');
const popupNameEl = document.querySelector('.popup__input_value_name');
const profileInfoProfessionEl = document.querySelector('.profile__info-profession');
const popupProfessionEl = document.querySelector('.popup__input_value_profession');
const popupFormEl = document.querySelector('.popup__form');
const saveButton = document.querySelector('#saveButton');
const formProfile = document.querySelector('#formProfile');
//  переменные для попапа с картинкой
const popupImage = document.querySelector('#popupImage');                           
const closeBigPicture = document.querySelector('.popup__close-button_picture');     
const bigPicrure = document.querySelector('.popup__picture');                       
const bigPictureName = document.querySelector('.popup__name');                     
//  переменные для попапа с добавлением карточек 
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
const formCards = document.querySelector('.popup__form_cards')                        

//  ф-я-обработчик (СЛУШАТЕЛЬ) для кнопки редактирования профайла (открытие попап)

profileEditButtonEl.addEventListener('click', () => {
    openPopup(editPopupEl);
    valuesInput();                                                                           
    hideInputError(popupFormEl, popupNameEl, validation);
    hideInputError(popupFormEl, popupProfessionEl, validation);
    deleteErrorClass(saveButton, validation);  
});

//  ф-я-обработчик (СЛУШАТЕЛЬ) для кнопки редактирования профайла (закрытие попап)

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

/////    ДОБАВЛЕНИЕ 6 СТАНДАРТНЫХ КАРТОЧЕК

//   ф-я заполнения карточки контентом (клоинирование)

function createCard(value) {
  // клонирую элементы карточки (true-полное клонирование)
    const newCloneCard = templateCard.cloneNode(true);                 
    const nameCard = newCloneCard.querySelector('.element__name');     
    const linkCard = newCloneCard.querySelector('.element__pic');      

    nameCard.textContent = value.name;                                 
    linkCard.src = value.link;                                         

    //    ЛАЙК КАРТОЧКИ
    const likeButton = newCloneCard.querySelector('.element__reaction');       

    likeButton.addEventListener('click', function () {                          
        likeButton.classList.toggle('element__reaction_like');      
    });

    //    УДАЛЕНИЕ КАРТОЧКИ
    const trashButton = newCloneCard.querySelector('.element__trash');       

    trashButton.addEventListener('click', function() {                            
      templateCards.removeChild(newCloneCard);                    
    });

    //    ОТКРЫТИЕ POPUP С УВЕЛИЧЕННОЙ КАРТИНКОЙ
    const pictureButton = newCloneCard.querySelector('.element__pic');      
    
    pictureButton.addEventListener('click', function() {                    
        openPopup(popupImage);                                              

        bigPicrure.src = linkCard.src;                                      
        bigPictureName.textContent = nameCard.textContent;                  
    });

    //  ВОЗВРАЩАЮ УЖЕ ЗАПОЛНЕННУЮ КАРТОЧКУ
    return newCloneCard;                                                    
  };

// прохожусь по каждому элементу массива
initialCards.forEach(function (item) {
  createCard(item);                          

  const newCard = createCard(item);          
                
  templateCards.append(newCard);             
});

//   ОТКРЫТИЕ И ЗАКРЫТИЕ POPUP ДЛЯ ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК

profileAddButtonEl.addEventListener('click', () => {
  formCards.reset();
  openPopup(addPopupEl);
  hideInputError(formCards, nameCard, validation);
  hideInputError(formCards, picturelinkCard, validation);
  addErrorClass(addCardButton, validation);
});

closeButtonAdd.addEventListener('click', () => closePopup(addPopupEl));

//     ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ

formCards.addEventListener('submit', (evt) => {                                     
    evt.preventDefault();                                                          
    closePopup(addPopupEl);                            

    const addNewCard = createCard({                
        name: nameCard.value,                      
        link: picturelinkCard.value                 
    });

    templateCards.prepend(addNewCard);              
    evt.target.reset();
});

//    ЗАКРЫТИЕ ПОПАПА С КАРТИНКОЙ

closeBigPicture.addEventListener('click', function() {      
    closePopup(popupImage);                             
});

//------------------------------------------------------------------------------------------------------- //

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