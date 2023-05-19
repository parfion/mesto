const profileEditButtonEl = document.querySelector('.profile__edit-button');
const editPopupEl = document.querySelector('.popup');
const popupCloseButtonEl = document.querySelector('.popup__close-button');
const profileInfoNameEl = document.querySelector('.profile__info-name');
const popupNameEl = document.querySelector('.popup__input_name_value');
const profileInfoProfessionEl = document.querySelector('.profile__info-profession');
const popupProfessionEl = document.querySelector('.popup__input_profession_value');
const popupFormEl = document.querySelector('.popup__form');

profileEditButtonEl.addEventListener('click', function() {
    openPopup(editPopupEl); 
});

popupCloseButtonEl.addEventListener('click', function() {
    closePopup(editPopupEl);
});

popupNameEl.value = profileInfoNameEl.textContent;
popupProfessionEl.value = profileInfoProfessionEl.textContent;

popupFormEl.addEventListener('submit', function(event) {
    event.preventDefault();

    profileInfoNameEl.textContent = popupNameEl.value;
    profileInfoProfessionEl.textContent = popupProfessionEl.value;

    closePopup(editPopupEl);
});

function openPopup(popupEl) {
    popupEl.classList.add('popup_opened'); 
};

function closePopup(popupEl) {
    popupEl.classList.remove('popup_opened');
}

