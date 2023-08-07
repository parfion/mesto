//  Класс UserInfo - отвечает за редактирование данных профайла

export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {
        this._nameProfile = document.querySelector(nameSelector);
        this._infoProfile = document.querySelector(infoSelector);
        this._avatarProfile = document.querySelector(avatarSelector)
    }

    // метод, который возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._nameProfile.textContent,
            info: this._infoProfile.textContent
        }
    }

    // метод, который принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(obj) {
        this._nameProfile.textContent = obj.name;
        this._infoProfile.textContent = obj.about;
        this._avatarProfile.src = obj.avatar
    }
}