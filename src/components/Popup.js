//  Класс Popup - отвечает за открытие и закрытие попапа

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    // ЗАКРЫТИЕ POPUP на ESC
    _handleEscClose(evt) {    
        if (evt.key === 'Escape') {                                         
            this.close();                                       
        };
    }

    // ЗАКРЫТИЕ POPUP на overlay
    _handleOverlayClose(evt) {                 
        if (evt.target === evt.currentTarget) {                         
            this.close();                                   
        };
    }

    // ОТКРЫТИЕ POPUP
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    // ЗАКРЫТИЕ POPUP
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // Добавляем слушатели
    setEventListeners() {
        this._closeButton.addEventListener('click', this.close.bind(this));
        this._popup.addEventListener('click', this._handleOverlayClose);
    }
}