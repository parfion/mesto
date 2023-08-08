//  Класс Card - отвечает за создание карточки

export class Card {
    constructor(data, templateSelector, handleCardClick, myUserId, handleDeleteClick, likeClick, dislikeClick) {
      // name и link — приватные поля
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes
      this._templateSelector = templateSelector; // записали селектор в приватное поле
      this._handleCardClick = handleCardClick;    // ф-я открытия попапа большой картинки
      this._ownerId = data.owner._id
      this._myUserId = myUserId;
      this._openPopupDeleteCard = handleDeleteClick;
      this._id = data._id;
      this._data = data;
      this._likeClick = likeClick;
      this._dislikeClick = dislikeClick;
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
      this._likesCount = this._element.querySelector('.element__reaction-count');
  
      this._setEventListeners();

      if(this._myUserId !== this._ownerId) {
        this._trashCard.remove();
      }

      if(this._likes.some(item => item._id === this._myUserId)) {
        this._likeCard.classList.add('element__reaction_like');
      } 
      
      // Добавим данные
      this._nameCard.textContent = this._name;
      this._linkCard.src = this._link;
      this._likesCount.textContent = this._likes.length;
      
      // Вернём элемент наружу
      return this._element;
    }
  
    // слушатели
    _setEventListeners() {
      this._likeCard.addEventListener('click', () => { 
        if(this._likeCard.classList.contains('element__reaction_like')) {
          this._handledislikeClick();
        }
        else {
          this._handleLikeClick();
        }
      });
  
      this._trashCard.addEventListener('click', () => {
        this._openPopupDeleteCard(this._id, this);
      });
  
      this._linkCard.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      })
    }
  
    // метод лайка карточки
    _handleLikeClick() {
      // this._likeCard.classList.add('element__reaction_like');
      this._likeClick(this._id, this._data);
    };

    changeLikeCard(res) {
      this._likesCount.textContent = res.likes.length;
			this._likeCard.classList.add('element__reaction_like');
    }

    // метод дизлайка карточки
    _handledislikeClick() {
      // this._likeCard.classList.remove('element__reaction_like');
      this._dislikeClick(this._id, this._data);
    };

    changeDislikeCard(res) {
      this._likesCount.textContent = res.likes.length;
			this._likeCard.classList.remove('element__reaction_like');
    }

    //метод УДАЛЕНИЯ карточки
    deleteCardClick() {
      this._element.remove();
    };
  }