 export const validation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup_button_inactive',
    inputErrorClass: 'popup_input-error',
    errorClass: 'form__input-error_active'
  };

 export class FormValidator {
    constructor(validation, formElement) {
        this._form = formElement;
        this._validation = validation;

    }

    //   ф-я добавления классов с ошибкой
    _showInputError(inputElement, errorMessage) {              
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);    
        inputElement.classList.add(this._validation.inputErrorClass);                         
        errorElement.textContent = errorMessage;                                        
        errorElement.classList.add(this._validation.errorClass);                              
    };

    //   ф-я удаления классов с ошибкой
    _hideInputError (inputElement) {                             
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);        
    
        inputElement.classList.remove(this._validation.inputErrorClass);                          
        errorElement.classList.remove(this._validation.errorClass);                               
        errorElement.textContent = '';                                                      
    };

    //   ф-я проверки инпута на валидность
    _checkInputValidity (inputElement) {                         
        if(!inputElement.validity.valid) {                                                             
            this._showInputError(inputElement, inputElement.validationMessage);      
        }
        else {                                                                                          
            this._hideInputError(inputElement);                                      
        };
    };
    
    //   ф-я одновременной валидации всех инпутов для блокировки/разблокировки кнопки
    _hasInvalidInput (inputList) {                                            
        return inputList.some((inputElement) => {           
            return !inputElement.validity.valid             
        });
    };

    //  ф-я добавления ошибок
    _addErrorClass (buttonElement)  {
        buttonElement.classList.add(this._validation.inactiveButtonClass);                
        buttonElement.setAttribute('disabled', 'true'); 
    }
    
    //  ф-я удаления ошибок
    _deleteErrorClass (buttonElement) {
        buttonElement.classList.remove(this._validation.inactiveButtonClass);             
        buttonElement.removeAttribute('disabled'); 
    }
    
    //   ф-я блокировки/разблокировки кнопки
    _toggleButtonState (inputList, buttonElement) {                          
        if (this._hasInvalidInput(inputList)) {                                               
            this._addErrorClass(buttonElement);                          
        } else {                                                                        
            this._deleteErrorClass(buttonElement);                             
        };
    };

    //   функция-обработчик (СЛУШАТЕЛЬ) для всех инпутов
    _setEventListeners() {                                      
        const inputList = Array.from(this._form.querySelectorAll(this._validation.inputSelector));       
        const buttonElement = this._form.querySelector(this._validation.submitButtonSelector);           
        
        this._toggleButtonState(inputList, buttonElement);                   
    
        inputList.forEach((inputElement) => {                                      
            inputElement.addEventListener('input', () => {                         
                this._checkInputValidity(inputElement)          
    
                this._toggleButtonState(inputList, buttonElement);           
            });
        });
    }

    //   ф-я валидации всех форм
    enableValidation() {                                                                                                                                
            this._setEventListeners();                                          
    };

    //сброс данных формы
    //форма профайла
    resetFormProfile(inputElement, buttonElement) {
        this._hideInputError(inputElement);
        this._deleteErrorClass(buttonElement);  
    };

    //форма карточки
    resetFormCard(inputElement, buttonElement) {
        this._hideInputError(inputElement);
        this._addErrorClass(buttonElement);
    };
}