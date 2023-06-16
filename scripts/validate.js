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

//  1. ф-я добавления классов с ошибкой

const showInputError = (formElement, inputElement, errorMessage, validation) => {              
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);    //1.1 нахожу инпут по id

    inputElement.classList.add(validation.inputErrorClass);                         //1.2 добавляю класс красного подчеркивания в инпут
    errorElement.textContent = errorMessage;                                        //1.3 текстом ошибки(спана) будет стандартный текст браузера
    errorElement.classList.add(validation.errorClass);                              //1.4 добавляю класс стилей текста ошибки
};

//  2. ф-я удаления классов с ошибкой

    const hideInputError = (formElement, inputElement, validation) => {                             
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);        //2.1 еще раз нахожу инпут по id

    inputElement.classList.remove(validation.inputErrorClass);                          //2.2 удаляю класс красного подчеркивания
    errorElement.classList.remove(validation.errorClass);                               //2.3 удаляю класс стилей текста ошибки
    errorElement.textContent = '';                                                      //2.4 текстом ошибки(спана) будет пустая строка
};

//  3. ф-я проверки инпута на валидность

const checkInputValidity = (formElement, inputElement, validation) => {                         
    if(!inputElement.validity.valid) {                                                              //3.1 если инпут невалиден
        showInputError(formElement, inputElement, inputElement.validationMessage, validation);      //3.2 вызываю ф-ю добавления классов ошибки
    }
    else {                                                                                          //3.3 иначе
        hideInputError(formElement, inputElement, validation);                                      //3.4 вызываю ф-ю удаления классов ошибки
    };
}

//  4. ф-я одновременной валидации всех инпутов для блокировки/разблокировки кнопки

const hasInvalidInput = (inputList) => {                                            
    return inputList.some((inputElement) => {           //4.1 методом some прохожусь по массиву инпутов
        return !inputElement.validity.valid             //4.2 если хотя бы один инпут невалиден возвращаю true и прекащаю проверку 
    });
};

//  5. ф-я блокировки/разблокировки кнопки

const toggleButtonState = (inputList, buttonElement, validation) => {                          
    if (hasInvalidInput(inputList)) {                                               //5.1 если хотя бы одно из инпутов невалидно
        buttonElement.classList.add(validation.inactiveButtonClass);                //5.2 добавляю класс стилей неактивной кнопки
        buttonElement.setAttribute('disabled', 'true');                             //5.3 добавляю атрибут неактивной кнопки
    } else {                                                                        //5.4 иначе
        buttonElement.classList.remove(validation.inactiveButtonClass);             //5.5 удаляю класс стилей неактивной кнопки
        buttonElement.removeAttribute('disabled');                                  //5.6 удаляю атрибут неактивной кнопки
    };
};

//  6. функция-обработчик (СЛУШАТЕЛЬ) для всех инпутов

const setEventListeners = (formElement, validation) => {                                      
    const inputList = Array.from(formElement.querySelectorAll(validation.inputSelector));       //6.1 нахожу все инпуты и делаю из них массив
    const buttonElement = formElement.querySelector(validation.submitButtonSelector);           //6.2 нахожу кропку в элементе формы
    
    toggleButtonState(inputList, buttonElement, validation);                   //6.7 вызываю здесь ф-ю блок-и/разблок-и кнопки, чтобы шла проверка при загрузке страницы

    inputList.forEach((inputElement) => {                                      //6.3 прохожусь по каждому элементу массива инпутов
        inputElement.addEventListener('input', () => {                         //6.4 при каждом нажатии клавиши в инпуте
            checkInputValidity(formElement, inputElement, validation)          //6.5 вызываю ф-ю проверки инпута на валидность

            toggleButtonState(inputList, buttonElement, validation);           //6.6 вызываю здесь ф-ю блок-и-разблок-и кнопки, при каждом нажатии клавиши
        });
    });
}; 

//  7. ф-я валидации всех форм

function enableValidation(validation) {                                                                                    
    const formList = Array.from(document.querySelectorAll(validation.formSelector));         // 7.1 нахожу все формы и делаю из них массив
    formList.forEach((formElement) => {                                                      // 7.2 прохожусь по каждому элементу массива с формами
        setEventListeners(formElement, validation);                                          // 7.3 вызываю ф-ю обработчик во всех формах
    }); 
  };

  //  8. ВЫЗОВ Ф-И ВАЛИДАЦИИ

  enableValidation(validation);     