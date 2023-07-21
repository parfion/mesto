//  Класс PopupWithImage - отвечает за передачу данных в попап с картинкой

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__picture');
        this._imageName = this._popup.querySelector('.popup__name');
    }

    // перезаписываем метод open родителя
    open(name, link) {                                     
        this._imageName.textContent = name;
        this._image.src = link;
        this._image.alt = name;
        // вызываем метод open у родителя
        super.open()
    }
}