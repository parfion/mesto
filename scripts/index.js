//    Popup редактирования профайла

const profileEditButtonEl = document.querySelector('.profile__edit-button');
const editPopupEl = document.querySelector('.popup__profile_edit_button');
const popupCloseButtonEl = document.querySelector('.popup__close-button');
const profileInfoNameEl = document.querySelector('.profile__info-name');
const popupNameEl = document.querySelector('.popup__input_value_name');
const profileInfoProfessionEl = document.querySelector('.profile__info-profession');
const popupProfessionEl = document.querySelector('.popup__input_value_profession');
const popupFormEl = document.querySelector('.popup__form');

profileEditButtonEl.addEventListener('click', function() {
    openPopup(editPopupEl); 
});

popupCloseButtonEl.addEventListener('click', function() {
    closePopup(editPopupEl);
});

popupNameEl.value = profileInfoNameEl.textContent;
popupProfessionEl.value = profileInfoProfessionEl.textContent;

popupFormEl.addEventListener('submit', function(event) {
    event.preventDefault();

    profileInfoNameEl.textContent = popupNameEl.value;
    profileInfoProfessionEl.textContent = popupProfessionEl.value;

    closePopup(editPopupEl);
});

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened'); 
};

function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
}

//    Popup добавления 6 стандартных карточек

//    Массив с названиями и картинками карточек
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

  const templateCards = document.querySelector('.elements');             //1. Нахожу блок, в который будут добавляться карточки
  const templateContent = templateCards.content;                         //2. Нахожу содержимое блока
  const templateCard = templateContent.querySelector('.element');        //3. Нахожу содержимое карточки

  //4. Прохожусь по каждому элементу массива

  initialCards.forEach(function (item) {
    createCard(item);                          //5. обращаюсь к функции, которую определяю ниже
    const newCard = createCard(item);       //13. присваиваю обновленные карточки новой переменной
    //console.log(newCloneCards);                  14. проверяю, добавился ли контент в верстку
    templateCards.append(newCard);       //15. добавляю карточки на страницу
  });

  //6. Создал функию для заполнения карточки контентом

  function createCard(value) {
    const newCloneCard = templateCard.cloneNode(true);                 //7. клонирую элементы карточки (true-полное клонирование) и присваиваю его переменной
    const nameCard = newCloneCard.querySelector('.element__name');     //8. нахожу элемент в карточке, в который будет записан заголовок
    const linkCard = newCloneCard.querySelector('.element__pic');      //9. нахожу элемент в карточке, в который будет записана картинка

    nameCard.textContent = value.name;                                //10. контентом для заголовка в карточке будет имя из массива
    linkCard.src = value.link;                                        //11. контентом для заголовка в карточке будет ссылка из массива

    //    Лайк карточки

    const likeButton = newCloneCard.querySelector('.element__reaction');        //1. нахожу все кнопки лайка
    //console.log(likeButton);

      likeButton.addEventListener('click', function () {                        //2. добавляю на них слушатель
        likeButton.classList.toggle('element__reaction_like');                  //3. на клик вызывается функция, которая добавляет класс черного лайка
      });

    //    Удаление карточки

    const trashButton = newCloneCard.querySelector('.element__trash');          //1. нахожу все кнопки удаления карточки
    trashButton.addEventListener('click', function() {                          //2. вешаю на клик кноки действие
      templateCards.removeChild(newCloneCard);                                  //3. удаляю элемент(карточку) у блока(родителя) 
    });

    return newCloneCard;     //12. возвращаю карточку с элементами
  };

  //    Откытие и закрытие Popup для добавления новых карточек

  const profileAddButtonEl = document.querySelector('.profile__add-button');
  const addPopupEl = document.querySelector('.popup__profile_add_button');
  const closeButtonAdd = document.querySelector('.popup__close-button_add');

  profileAddButtonEl.addEventListener('click', () => {
    openPopup(addPopupEl);
  });

  closeButtonAdd.addEventListener('click', () => {
    closePopup(addPopupEl);
  });


  //    Добавление карточки

  const nameCard = document.querySelector('.popup__input_value_name-card');         //1. нахожу поле, в котором пользователь указывает имя
  const picturelinkCard = document.querySelector('.popup__input_value_picture-card');   //2. нахожу поле, в котором пользователь указывает ссылку на картинку
  const formCards = document.querySelector('.popup__form_cards')                    //3. нахожу форму

    formCards.addEventListener('submit', (event) => {                               //4. вешаю обработчик на форму
      event.preventDefault();                                                         //5. убираю отправку формы
  
      closePopup(addPopupEl);                                                         //6. вызываю функцию закрытия попапа

    const addNewCard = createCard({               //7. вызываю функцию клонирования, в которую передаю новые аргументы
      name: nameCard.value,                       //8. значением name будет введенное имя
      link: picturelinkCard.value                 //9. значением name будет введенная ссылка
    });
    templateCards.prepend(addNewCard);            //10. добавляю карточку в начало блока
  });
