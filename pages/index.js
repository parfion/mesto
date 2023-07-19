import { imagePopup, formProfilePopup, formCardPopup, editPopup, buttonOpenProfilePopup, 
		nameInputProfilePopup, professionInputProfilePopup, buttonSaveProfilePopup, cardPopup, 
		buttonOpenCardPopup, nameInputCardPopup, linkInputCardPopup} from '../utils/constants.js';
import { initialCards } from '../utils/initialCards.js';
import { validation } from '../utils/validationObj.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

//----------------------------------------------------------------------------------- //

//  ДОБАВЛЕНИЕ 6 СТАНДАРТНЫХ КАРТОЧЕК
//	создание экземпляра карточки
function createCard(data) {
	const card = new Card(data, '.elements', handleCardClick);
	return card.generateCard();
}

const cardsList = new Section({ 
	items: initialCards, 
	renderer: (item) => { 
		const cardElement = createCard(item);
		cardsList.addItem(cardElement);
	} 
  }, '.elements');
  
cardsList.renderItems()

// создание НОВОЙ карточки
function handleFormSubmitCard() {
	const addNewCard = ({                
		name: nameInputCardPopup.value,                      
		link: linkInputCardPopup.value                 
	});
	const newCard = createCard(addNewCard);
	cardsList.addItem(newCard);

	popupCard.close()
}

// ПОПАП с картинкой
// (для передачи в класс Card)
const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link)
}

//----------------------------------------------------------------------------------- //

//	ПОПАП для редактирования профайла
const userInfo = new UserInfo({ nameSelector: '.profile__info-name', infoSelector: '.profile__info-profession' });

// сабмит попапа профайла
// для передачи в класс PopupWithForm
function handleFormSubmitProfile(data) {
	userInfo.setUserInfo(data);
	popupProfile.close();
}

const popupProfile = new PopupWithForm(editPopup, handleFormSubmitProfile);
popupProfile.setEventListeners();
buttonOpenProfilePopup.addEventListener('click', () => {
	popupProfile.open();
	const userObj = userInfo.getUserInfo();
	nameInputProfilePopup.value = userObj.name;               
    professionInputProfilePopup.value = userObj.info;
	popupEditForm.resetValidation();
	buttonSaveProfilePopup.classList.remove(validation.inactiveButtonClass);
})

//-------------------------------------------------------------------------------------//

// ПОПАП для создания карточки
const popupCard = new PopupWithForm(cardPopup, handleFormSubmitCard);
popupCard.setEventListeners();

buttonOpenCardPopup.addEventListener('click', () => {
	popupCard.open();
	popupAddform.resetValidation();
});

//-------------------------------------------------------------------------------------//

// ВАЛИДАЦИЯ форм
const popupEditForm = new FormValidator(validation, formProfilePopup);
popupEditForm.enableValidation();

const popupAddform = new FormValidator(validation, formCardPopup);
popupAddform.enableValidation();