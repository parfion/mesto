//  переменные для попапа редактирования профиля

const profileEditButtonEl = document.querySelector('.profile__edit-button');
const editPopupEl = document.querySelector('#editButton');
const popupCloseButtonEl = document.querySelector('.popup__close-button');
const profileInfoNameEl = document.querySelector('.profile__info-name');
const popupNameEl = document.querySelector('.popup__input_value_name');
const profileInfoProfessionEl = document.querySelector('.profile__info-profession');
const popupProfessionEl = document.querySelector('.popup__input_value_profession');
const popupFormEl = document.querySelector('.popup__form');

//  переменные для попапа с картинкой

const popupImage = document.querySelector('#popupImage');                           
const closeBigPicture = document.querySelector('.popup__close-button_picture');     
const bigPicrure = document.querySelector('.popup__picture');                       
const bigPictureName = document.querySelector('.popup__name');                     


//  ф-я-обработчик (СЛУШАТЕЛЬ) для кнопки редактирования профайла (открытие попап)

profileEditButtonEl.addEventListener('click', () => {
    openPopup(editPopupEl);
    valuesInput();                                                                            // задаю значения инпутам
    document.querySelector('.popup__save-button').classList.remove('popup_button_inactive');  // удаляю класс неактивных стилей
});

//  ф-я-обработчик (СЛУШАТЕЛЬ) для кнопки редактирования профайла (закрытие попап)

popupCloseButtonEl.addEventListener('click', () => closePopup(editPopupEl));

//  ф-я, которая задает значения инпутам, при открытии попапа

function valuesInput() {
    popupNameEl.value = profileInfoNameEl.textContent;                // значением первого инпута будет имя профиля из html
    popupProfessionEl.value = profileInfoProfessionEl.textContent;    // значением второго инпута будет название професси из html
};

valuesInput();    //  сразу, при загрузке страницы вызываю ф-ю

//   ф-я отправки формы на сервер

popupFormEl.addEventListener('submit', function(event) {
    event.preventDefault();                                           // отменяю стандартное действие сабмита

    profileInfoNameEl.textContent = popupNameEl.value;                // применяю значения инпута в профиле
    profileInfoProfessionEl.textContent = popupProfessionEl.value;

    closePopup(editPopupEl);                                          // закрываю попап, сохраняя введенные данные
});

//  ф-я (УНИВЕРСАЛЬНАЯ) открытия любого из попапов

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened');                        // добавляю класс открытого попапа
    document.addEventListener('keydown', closePopupByEsc);        // вешаю слушатель на весь документ (вызыва ф-ю закрытия попапа на Esc)
    document.addEventListener('click', closePopupByOverlay);      // вешаю слушатель на весь документ (вызыва ф-ю закрытия попапа на Overlay)
  };

//  ф-я (УНИВЕРСАЛЬНАЯ) закрытия любого из попапов

function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);         
    document.removeEventListener('click', closePopupByOverlay);
    
    deleteInputError();                                           // удаляю оишбки 
}
// --------------------------------------------------------------------------------------- //

/////    ДОБАВЛЕНИЕ 6 СТАНДАРТНЫХ КАРТОЧЕК

// 1. переменные для попапа с добавлением карточек 

const templateCards = document.querySelector('.elements');             //1.1 нахожу блок, в который будут добавляться карточки
const templateContent = templateCards.content;                         //1.2 Нахожу содержимое блока
const templateCard = templateContent.querySelector('.element');        //1.3 Нахожу содержимое карточки

//  2. ф-я заполнения карточки контентом (клоинирование)

function createCard(value) {
    const newCloneCard = templateCard.cloneNode(true);                 //2.1 клонирую элементы карточки (true-полное клонирование)
    const nameCard = newCloneCard.querySelector('.element__name');     //2.2 нахожу элемент в карточке, в который будет записан заголовок
    const linkCard = newCloneCard.querySelector('.element__pic');      //2.3 нахожу элемент в карточке, в который будет записана картинка

    nameCard.textContent = value.name;                                 //2.4 контентом для заголовка в карточке будет имя из массива
    linkCard.src = value.link;                                         //2.5 контентом для заголовка в карточке будет ссылка из массива

    //    ЛАЙК КАРТОЧКИ

    const likeButton = newCloneCard.querySelector('.element__reaction');       // нахожу все кнопки лайка

    //  5. вешаю слушатель на кнопку лайка
    likeButton.addEventListener('click', function () {                          
        likeButton.classList.toggle('element__reaction_like');      //5.1 на клик вызывается функция, которая добавляет класс черного лайка
    });

    //    УДАЛЕНИЕ КАРТОЧКИ

    const trashButton = newCloneCard.querySelector('.element__trash');       // нахожу все кнопки удаления карточки

    //  6. вешаю слушатель на кнопку удаления карточки
    trashButton.addEventListener('click', function() {                            
      templateCards.removeChild(newCloneCard);                    //6.1 удаляю элемент(карточку) у блока(родителя) 
    });

    //    ОТКРЫТИЕ POPUP С УВЕЛИЧЕННОЙ КАРТИНКОЙ
    
    const pictureButton = newCloneCard.querySelector('.element__pic');      // нахожу все картинки на карточках
    
    //  7. вешаю слушатель на нажатие картинки
    pictureButton.addEventListener('click', function() {                    
        openPopup(popupImage);                                              //7.1 вызываю функцию открытия попапа

        bigPicrure.src = linkCard.src;                                      //7.2 большой картинкой для попапа будет картинка из карточки
        bigPictureName.textContent = nameCard.textContent;                  //7.3 текстом для попапа будет название из карточки
    });

    //  3. ВОЗВРАЩАЮ УЖЕ ЗАПОЛНЕННУЮ КАРТОЧКУ
    
    return newCloneCard;                                                    
  };

//4. прохожусь по каждому элементу массива

initialCards.forEach(function (item) {
  createCard(item);                          //4.1 ВЫЗЫВАЮ Ф-Ю ЗАПОЛНЕННОЙ КАРТОЧКИ

  const newCard = createCard(item);          //4.2 присваиваю эту функцию новой переменной
                
  templateCards.append(newCard);             //4.3 ДОБАВЛЯЮ КАРТОЧКИ НА СТРАНИЦУ (В HTML)
});
  

//   ОТКРЫТИЕ И ЗАКРЫТИЕ POPUP ДЛЯ ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК

const profileAddButtonEl = document.querySelector('.profile__add-button');
const addPopupEl = document.querySelector('#addButton');
const closeButtonAdd = document.querySelector('.popup__close-button_add');

//  8. вешаю слушатель на кнопку добавления новой карточки (открытие попапа)

profileAddButtonEl.addEventListener('click', () => {
  formCards.reset();
  
  openPopup(addPopupEl);
});

//  9. вешаю слушатель на кнопку добавления новой карточки (закрытие попапа)

closeButtonAdd.addEventListener('click', () => closePopup(addPopupEl));

//     ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ

const nameCard = document.querySelector('.popup__input_value_name-card');             //10.1 нахожу поле, в котором пользователь указывает имя
const picturelinkCard = document.querySelector('.popup__input_value_picture-card');   //10.2 нахожу поле, в котором пользователь указывает ссылку на картинку
const formCards = document.querySelector('.popup__form_cards')                        //10.3 нахожу форму

//  10.4 ф-я для отправки формы на сервер

formCards.addEventListener('submit', (evt) => {                                     
    evt.preventDefault();                                                             //10.5 убираю перезагрузку страницы
  
    closePopup(addPopupEl);                                                           //10.6 вызываю функцию закрытия попапа

    const addNewCard = createCard({                 //10.7 вызываю функцию клонирования, в которую передаю новые аргументы
        name: nameCard.value,                       //10.8 значением name будет введенное имя
        link: picturelinkCard.value                 //10.9 значением name будет введенная ссылка
    });

    templateCards.prepend(addNewCard);              //10.10 ДОБАВЛЯЮ НОВУЮ СОЗДАННУЮ КАРТОЧКУ В НАЧАЛО БЛОКА
    evt.target.reset();
    deleteInputError();
});

//    ЗАКРЫТИЕ ПОПАПА С КАРТИНКОЙ

// 11. вешаю слушатель на кнопку закрытия попапа

closeBigPicture.addEventListener('click', function() {      
    closePopup(popupImage);                                  //11.1 вызываю функцию закрытия попапа
});

//------------------------------------------------------------------------------------------------------- //

//  ЗАКРЫТИЕ ПОПАПОВ НА ESC

//  ф-я закрытия попапа на Esc (вызываю ее при открытии и закрытии попапа)

function closePopupByEsc(evt) {
    const openedPopup = document.querySelector('.popup_opened');        // ищу открытый попап по открытому классу
    if (evt.key === 'Escape') {                                         // если нажата клавиша Escape
      
      closePopup(openedPopup);                                          // вызываю универсальную ф-ю закрытия попапа
    };
  };

  //  ЗАКРЫТИЕ ПОПАПОВ НА OVERLAY

  //  ф-я закрытия попапа на Overlay (вызываю ее при открытии и закрытии попапа)

  function closePopupByOverlay() {
    const openedPopup = document.querySelector('.popup_opened');
    openedPopup.addEventListener("click", (evt) => {                  // вешаю слушатель клика на открытый попап
      if (evt.currentTarget === evt.target) {                         // если эл-т, где сработал обработчик(родитель)ю равен эл-ту, где возникло событие
        closePopup(openedPopup);                                      // тогда закрываю попап
      };
    });
  };

  //  ф-я, которая убирает ошибки и их содержимое в элементах формы

  function deleteInputError() {                                                                   
    const inputList = Array.from(document.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => inputElement.classList.remove('popup_input-error'));

    const spanList = Array.from(document.querySelectorAll('.form__type-error'));
    spanList.forEach((spanElement) => spanElement.classList.remove('form__input-error_active'));
    spanList.forEach((spanElement) => spanElement.textContent = '');

    const buttonList = Array.from(document.querySelectorAll('.button'));
    buttonList.forEach((buttonElement) => {
      buttonElement.classList.add('popup_button_inactive');
      buttonElement.setAttribute('disabled', 'true');
    });
  };