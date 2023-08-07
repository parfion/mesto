//  Класс PopupWithForm - отвечает за создание попапов

import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitbutton = this._popup.querySelector('.button');
    }

    // метод для сбора данных всех полей формы
    _getInputValues() {
       
        // создаём пустой объект
        const formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return formValues;
    }

    // перезаписываем родительский метод close
    close() {
        super.close();
        this._form.reset();
    }

    renderLoading(text) {
        this._submitbutton.textContent = text;
    }

    // перезаписываем родительский метод setEventListeners
    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }
}