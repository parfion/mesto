//  Класс Section - отвечает за отрисовку элементов(карточек) на странице

export default class Section {
    constructor({renderer }, containerSelector) {
        this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице
        this._container = document.querySelector(containerSelector);
    }

    // метод, который принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.prepend(element)
    }

    // метод, который отвечает за отрисовку всех элементов
    renderItems(res) {
        res.forEach((item) => {
            this._renderer(item)
          }) 
    }
}