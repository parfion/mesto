import './index.css';
import { formProfilePopup, formCardPopup, buttonOpenProfilePopup, nameInputProfilePopup, 
		professionInputProfilePopup, buttonOpenCardPopup, formAvatarPopup, 
		buttonAvatarEditPopup } from '../utils/constants.js';
import { validation } from '../utils/validationObj.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Popup from '../components/Popup';
import PopupDeleteCard from '../components/PopupDeleteCard';
import Api from '../components/Api.js'

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
	headers: {
	  authorization: 'b2eb4ceb-9d74-43f2-a64d-7dea4a8d5d3c',
	  'Content-Type': 'application/json'
	}
  }); 

//	Загрузка информации о пользователе с сервера
api
	.getUserInfo()
	.then((data) => {
		userInfo.setUserInfo(data)
	})
	.catch((err) => console.error(`Ошибка: ${err}`))


//----------------------------------------------------------------------------------- //

//  Загрузка карточек с сервера
//	создание экземпляра карточки
let myUserId; 
function createCard(data) {
	const card = new Card(data, '.elements', handleCardClick, myUserId, openPopupDeleteCard, 
		likeCard, dislikeCard);
	return card.generateCard();
}

const cardList = new Section({
		renderer: (item) => { 
			const cardElement = createCard(item);
			cardList.addItem(cardElement);
		} 
}, '.elements');

Promise.all([api.getInitialCards(), api.getUserInfo()])
	.then(([cardsData, userData]) => {
		myUserId = userData._id;
		cardList.renderItems(cardsData);
	})
	.catch((err) => console.error(`Ошибка: ${err}`))

// ПОПАП с картинкой
// (для передачи в класс Card)
const popupWithImage = new PopupWithImage('#popupImage');
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}

//----------------------------------------------------------------------------------- //

// Обновление аватара пользователя
const popupAvatar = new PopupWithForm('#popupAvatar', handleFormEditAvatar);
popupAvatar.setEventListeners();

function handleFormEditAvatar(data) {
	popupAvatar.renderLoading('Сохранение...');
	api
		.editAvatar(data.link)
		.then((res) => {
		userInfo.setUserInfo(res);
		popupAvatar.close() 
		})
		.catch((err) => console.error(`Ошибка: ${err}`))
}

// открытие попапа
buttonAvatarEditPopup.addEventListener('click', () => {
	popupAvatar.renderLoading('Сохранить');
	popupAvatar.open();
	popupEditAvatar.resetValidation();
 })

//----------------------------------------------------------------------------------- //

//	Редактирование профиля
const userInfo = new UserInfo({ 
	nameSelector: '.profile__info-name', 
	infoSelector: '.profile__info-profession',
	avatarSelector: '.profile__avatar' 
});

const popupProfile = new PopupWithForm('#editButton', handleFormSubmitProfile);
popupProfile.setEventListeners();

function handleFormSubmitProfile(data) {
	popupProfile.renderLoading('Сохранение...')
	api
		.editUserInfo(data.name, data.profession)
		.then((res) => {
			userInfo.setUserInfo(res);
			popupProfile.close();
		})
		.catch((err) => console.error(`Ошибка: ${err}`))
}

// открытие попапа
buttonOpenProfilePopup.addEventListener('click', () => {
	popupProfile.renderLoading('Сохранить');
	popupProfile.open();
	const userObj = userInfo.getUserInfo();
	nameInputProfilePopup.value = userObj.name;               
    professionInputProfilePopup.value = userObj.info;
	popupEditForm.resetValidation();
	popupEditForm.enableSubmitButton();
})

//-------------------------------------------------------------------------------------//

// Добавление новой карточки
const popupCard = new PopupWithForm('#addButton', handleFormSubmitCard);
popupCard.setEventListeners();

function handleFormSubmitCard(data) {
	popupCard.renderLoading('Сохранение...')
	api
		.createNewCard(data.image, data.link)
		.then((card) => {
			const newCard = createCard(card);
			cardList.addItem(newCard);
			popupCard.close()
		})
		.catch((err) => console.error(`Ошибка: ${err}`))
};

// открытие попапа
buttonOpenCardPopup.addEventListener('click', () => {
	popupCard.renderLoading('Создать')
	popupCard.open();
	popupAddform.resetValidation();
});

//-------------------------------------------------------------------------------------//

// Удаление карточки
const popupDeleteCard = new PopupDeleteCard('#deleteButton', handleDeleteSubmit);
popupDeleteCard.setEventListeners();

function handleDeleteSubmit(cardId, cardElement) {
	popupDeleteCard.renderLoading('Удаление...');
	api
		.deleteCard(cardId)
		.then(() => {
			popupDeleteCard.close();
			cardElement.deleteCardClick()
		})
		.catch((err) => console.error(`Ошибка: ${err}`))
}

// открытие попапа
function openPopupDeleteCard(cardId, cardElement) {
	popupDeleteCard.renderLoading('Да');
	popupDeleteCard.open(cardId, cardElement);
}

//----------------------------------------------------------------------------------- //

// Лайк карточки
function likeCard(cardId, card) { 
	api
		.addLike(cardId, card)
		.then((res) => this._likesCount.textContent = res.likes.length )
		.catch((err) => console.error(`Ошибка: ${err}`))
}

// Дизлайк карточки
function dislikeCard(cardId, card) {
	api
		.deleteLike(cardId, card)
		.then((res) => this._likesCount.textContent = res.likes.length)
		.catch((err) => console.error(`Ошибка: ${err}`))
}

//-------------------------------------------------------------------------------------//

// ВАЛИДАЦИЯ форм
const popupEditForm = new FormValidator(validation, formProfilePopup);
popupEditForm.enableValidation();

const popupAddform = new FormValidator(validation, formCardPopup);
popupAddform.enableValidation();

const popupEditAvatar = new FormValidator(validation, formAvatarPopup);
popupEditAvatar.enableValidation();