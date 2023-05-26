//Popup редактирования профайла

const profileEditButtonEl = document.querySelector('.profile__edit-button');
const editPopupEl = document.querySelector('.popup');
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

//Popup добавления 6 стандартных карточек

//Массив с названиями и картинками карточек
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

  const templateElements = document.querySelector('.elements'); //1. Нахожу блок, в который будут добавляться карточки
  const templateContent = templateElements.content; //2. Нахожу содержимое блока
  const templateElement = templateContent.querySelector('.element'); //3. Нахожу содержимое карточки

  //4. Прохожусь по каждому элементу массива

  initialCards.forEach(function (item) {
    createCard(item); //5. обращаюсь к функции, которую определяю ниже
    const newElement = createCard(item); //13. присваиваю обновленные карточки новой переменной
    //console.log(newElements); 13. проверяю, добавился ли контент в верстку
    templateElements.append (newElement); //добавляю карточки на страницу
  });

  //6. Создал функию для заполнения карточки контентом

  function createCard(item) {
    const newElement = templateElement.cloneNode(true); //7. клонирую элементы карточки (true-полное клонирование) и присваиваю его переменной
    const textElement = newElement.querySelector('.element__name'); //8. нахожу элемент в карточке, в который будет записан заголовок
    const linkElement = newElement.querySelector('.element__pic'); //9. нахожу элемент в карточке, в который будет записана картинка
    textElement.textContent = item.name; //10. контентом для заголовка в карточке будет имя из массива
    linkElement.src = item.link; //11. контентом для заголовка в карточке будет ссылка из массива

    return newElement; //12. возвращаю карточку с элементами
  };

  //Popup добавления новых карточек

  