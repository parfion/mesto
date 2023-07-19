//  Класс Popup - отвечает за открытие и закрытие попапа

export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._closeButton = popupSelector.querySelector('.popup__close-button');
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
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    // ЗАКРЫТИЕ POPUP
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
        //console.log(this)
    }

    // Добавляем слушатели
    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (evt) => this._handleOverlayClose(evt));
    }
}