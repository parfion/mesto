//  Класс Card - отвечает за создание карточки

export class Card {
    constructor(data, templateSelector, handleCardClick ) {
      // name и link — приватные поля
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector; // записали селектор в приватное поле
      this._handleCardClick = handleCardClick;    // ф-я открытия попапа большой картинки
    }
  
    _getTemplate() {
      // операции, чтобы вернуть разметку
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element').cloneNode(true);
  
      // вернём DOM-элемент карточки
      return(cardElement)
    }
  
    generateCard() {
      // Запишем разметку в приватное поле _element
      this._element = this._getTemplate();
      this._nameCard = this._element.querySelector('.element__name');
      this._linkCard = this._element.querySelector('.element__pic');
      this._likeCard = this._element.querySelector('.element__reaction');
      this._trashCard = this._element.querySelector('.element__trash');
  
      this._setEventListeners();
      
      // Добавим данные
      this._nameCard.textContent = this._name;
      this._linkCard.src = this._link;
  
      // Вернём элемент наружу
      return this._element;
    }
  
    // слушатели
    _setEventListeners() {
      this._likeCard.addEventListener('click', () => { 
        this._handleLikeClick();
      });
  
      this._trashCard.addEventListener('click', () => {
        this._deleteCardClick();
      });
  
      this._linkCard.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      })
    }
  
    // метод ЛАЙКА карточки
    _handleLikeClick() {
      this._likeCard.classList.toggle('element__reaction_like');
    };

    //метод УДАЛЕНИЯ карточки
    _deleteCardClick() {
      this._element.remove();
    };
  }