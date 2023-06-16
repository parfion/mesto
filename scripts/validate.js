/////       ВАЛИДАЦИЯ ФОРМ

//  объект с ключами и значениями, которые используются при валидации

const validation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup_button_inactive',
    inputErrorClass: 'popup_input-error',
    errorClass: 'form__input-error_active'
  };

//   ф-я добавления классов с ошибкой

const showInputError = (formElement, inputElement, errorMessage, validation) => {              
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);    
    inputElement.classList.add(validation.inputErrorClass);                         
    errorElement.textContent = errorMessage;                                        
    errorElement.classList.add(validation.errorClass);                              
};

//   ф-я удаления классов с ошибкой

    const hideInputError = (formElement, inputElement, validation) => {                             
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);        

    inputElement.classList.remove(validation.inputErrorClass);                          
    errorElement.classList.remove(validation.errorClass);                               
    errorElement.textContent = '';                                                      
};

//   ф-я проверки инпута на валидность

const checkInputValidity = (formElement, inputElement, validation) => {                         
    if(!inputElement.validity.valid) {                                                             
        showInputError(formElement, inputElement, inputElement.validationMessage, validation);      
    }
    else {                                                                                          
        hideInputError(formElement, inputElement, validation);                                      
    };
}

//   ф-я одновременной валидации всех инпутов для блокировки/разблокировки кнопки

const hasInvalidInput = (inputList) => {                                            
    return inputList.some((inputElement) => {           
        return !inputElement.validity.valid             
    });
};

//  ф-я добавления ошибок

const addErrorClass = (buttonElement, validation) => {
    buttonElement.classList.add(validation.inactiveButtonClass);                
    buttonElement.setAttribute('disabled', 'true'); 
}

//  ф-я удаления ошибок

const deleteErrorClass = (buttonElement, validation) => {
    buttonElement.classList.remove(validation.inactiveButtonClass);             
    buttonElement.removeAttribute('disabled'); 
}

//   ф-я блокировки/разблокировки кнопки

const toggleButtonState = (inputList, buttonElement, validation) => {                          
    if (hasInvalidInput(inputList)) {                                               
        addErrorClass(buttonElement, validation);                          
    } else {                                                                        
        deleteErrorClass(buttonElement, validation);                             
    };
};

//   функция-обработчик (СЛУШАТЕЛЬ) для всех инпутов

const setEventListeners = (formElement, validation) => {                                      
    const inputList = Array.from(formElement.querySelectorAll(validation.inputSelector));       
    const buttonElement = formElement.querySelector(validation.submitButtonSelector);           
    
    toggleButtonState(inputList, buttonElement, validation);                   

    inputList.forEach((inputElement) => {                                      
        inputElement.addEventListener('input', () => {                         
            checkInputValidity(formElement, inputElement, validation)          

            toggleButtonState(inputList, buttonElement, validation);           
        });
    });
}; 

//   ф-я валидации всех форм

function enableValidation(validation) {                                                                                    
    const formList = Array.from(document.querySelectorAll(validation.formSelector));         
    formList.forEach((formElement) => {                                                      
        setEventListeners(formElement, validation);                                          
    }); 
  };

  //   ВЫЗОВ Ф-И ВАЛИДАЦИИ

  enableValidation(validation);     