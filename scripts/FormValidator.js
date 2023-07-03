export class FormValidator {
    constructor(validation, formElement) {
        this._validation = validation;
        this._form = formElement;
        this._formSelector = validation.formSelector;
        this._inputSelector = validation.inputSelector;
        this._submitButtonSelector = validation.submitButtonSelector;
        this._inactiveButtonClass = validation.inactiveButtonClass;
        this._inputErrorClass = validation.inputErrorClass;
        this._errorClass = validation.errorClass;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);
    }

    //   ф-я добавления классов с ошибкой
    _showInputError(inputElement, errorMessage) {              
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);    
        inputElement.classList.add(this._inputErrorClass);                         
        errorElement.textContent = errorMessage;                                        
        errorElement.classList.add(this._errorClass);                              
    };

    //   ф-я удаления классов с ошибкой
    _hideInputError(inputElement) {                             
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);        
    
        inputElement.classList.remove(this._inputErrorClass);                          
        errorElement.classList.remove(this._errorClass);                               
        errorElement.textContent = '';                                                      
    };

    //   ф-я проверки инпута на валидность
    _checkInputValidity(inputElement) {                         
        if(!inputElement.validity.valid) {                                                             
            this._showInputError(inputElement, inputElement.validationMessage);      
        }
        else {                                                                                          
            this._hideInputError(inputElement);                                      
        };
    };
    
    //   ф-я одновременной валидации всех инпутов для блокировки/разблокировки кнопки
    _hasInvalidInput() {                                            
        return this._inputList.some((inputElement) => {           
            return !inputElement.validity.valid             
        });
    };

    //  ф-я добавления ошибок
    _addErrorClass()  {
        this._button.classList.add(this._inactiveButtonClass);                
        this._button.setAttribute('disabled', 'true'); 
    }
    
    //  ф-я удаления ошибок
    _deleteErrorClass() {
        this._button.classList.remove(this._inactiveButtonClass);             
        this._button.removeAttribute('disabled'); 
    }
    
    //   ф-я блокировки/разблокировки кнопки
    _toggleButtonState() {                          
        if (this._hasInvalidInput(this._inputList)) {                                               
            this._addErrorClass(this._button);                          
        } else {                                                                        
            this._deleteErrorClass(this._button);                             
        };
    };

    //   функция-обработчик (СЛУШАТЕЛЬ) для всех инпутов
    _setEventListeners() {                                      
        this._toggleButtonState();                   
    
        this._inputList.forEach((inputElement) => {                                      
            inputElement.addEventListener('input', () => {                         
                this._checkInputValidity(inputElement)          
    
                this._toggleButtonState();           
            });
        });
    }

    //   ф-я валидации всех форм
    enableValidation() {                                                                                                                                
            this._setEventListeners();                                          
    };

    //сброс валидации
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
        this._addErrorClass();
    };
}