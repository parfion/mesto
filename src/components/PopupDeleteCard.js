import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector, handleDeleteSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleDeleteSubmit;
        this._submitbutton = this._popup.querySelector('#deleteCardButton');
        this._form = this._popup.querySelector('#formDeleteCard');
    }

    open(data, cardElement) {
        this._cardId = data;
        this._cardElement = cardElement;
        super.open();
    }

    renderLoading(text) {
        this._submitbutton.textContent = text;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            this._handleFormSubmit(this._cardId, this._cardElement);

        });
        super.setEventListeners();
    }
}