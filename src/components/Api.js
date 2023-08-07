export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._checkResponse = this._checkResponse.bind(this)
    }

    // проверка
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
          }
    
          // если ошибка, отклоняем промис
          return Promise.reject(`Ошибка: ${res.status}`);
      };
    
    // Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    // Загрузка карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    // Редактирование профиля
    editUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._checkResponse)
    }

    // Добавление новой карточки
    createNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._checkResponse)
    }

    // Удаление карточки
    deleteCard(card) {
        return fetch(`${this._baseUrl}/cards/${card}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    // Поставить лайк
    addLike(card) {
        return fetch(`${this._baseUrl}/cards/${card}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    // Убрать лайк
    deleteLike(card) {
        return fetch(`${this._baseUrl}/cards/${card}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    // Обновление аватара пользователя
    editAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar,

            })
        })
        .then(this._checkResponse)
    }
}
