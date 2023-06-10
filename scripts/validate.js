/////       ВАЛИДАЦИЯ ФОРМЫ РЕДАКТИРОВАТЬ ПРОФИЛЬ

const form = document.querySelector('.popup__form');                                //1. нахожу форму
const formInput = form.querySelector('.popup__input');                              //2. нахожу инпуты

const showInputError = (formElement, inputElement, errorMessage) => {               //3. ф-я добавления класса с ошибкой(принимает: эл-ты формы, эл-ты инпута, текст ошибки)
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);    //4. нахожу инпут по id

    inputElement.classList.add('popup_type-error');                                 //5. добавляю класс красного подчеркивания в инпут
    errorElement.textContent = errorMessage;                                        //6. текстом ошибки(спана) будет стандартный текст браузера
    errorElement.classList.add('form__input-error_active');                         //7. добавляю класс стилей текста ошибки
};

const hideInputError = (formElement, inputElement) => {                             //8. ф-я удаления класса с ошибкой
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);    //9. еще раз нахожу инпут по id

    inputElement.classList.remove('popup_type-error');                              //10. удаляю класс красного подчеркивания
    errorElement.classList.remove('form__input-error_active');                      //11. удаляю класс стилей текста ошибки
    errorElement.textContent = '';                                                  //12. текстом ошибки(спана) будет пустая строка
};

const checkInputValidity = (formElement, inputElement) => {                         //13. ф-я проверки инпута на валидность
    if(!inputElement.validity.valid) {                                              //14. если инпут невалиден
        showInputError(formElement, inputElement, inputElement.validationMessage);  //... вызываю ф-ю добавления класса ошибки
    }
    else {                                                                          //15. иначе
        hideInputError(formElement, inputElement);                                  //... вызываю ф-ю удаления класса ошибки
    };
}

const hasInvalidInput = (inputList) => {                                            //22. ф-я одновременной валидации всех инпутов для блокировки/разблокировки кнопки (принимает массив всех инпутов)
    return inputList.some((inputElement) => {                                       //23. методом some прохожусь по массиву инпутов
        return !inputElement.validity.valid                                         //24. если хотя бы один инпут невалиден возвращаю true и прекащаю проверку 
    });
};

const toggleButtonState = (inputList, buttonElement) => {                           //25. ф-я блокировки/разблокировки кнопки(принимаю: массив инпутов, элементы кнопки)
    
    if (hasInvalidInput(inputList)) {                                               //26. если хотя бы одно из инпутов невалидно
        buttonElement.classList.add('popup_button_inactive');                       //... добавляю класс стилей неактивной кнопки
        buttonElement.setAttribute('disabled', 'true');                             //... добавляю атрибут неактивной кнопки
    } else {                                                                        //27. иначе
        buttonElement.classList.remove('popup_button_inactive');                    //... удаляю класс стилей неактивной кнопки
        buttonElement.removeAttribute('disabled');                                  //... удаляю атрибут неактивной кнопки
    };
};

const setEventListeners = (formElement) => {                                        //16. функция-обработчик (слушатель) для всех инпутов
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));    //17. нахожу все инпуты и делаю из них массив
    const buttonElement = formElement.querySelector('.popup__save-button');         //21. нахожу кропку в элементе формы

    toggleButtonState(inputList, buttonElement);                                    //28. вызываю здесь ф-ю блок-и-разблок-и кнопки, чтобы шла проверка при первом открытии попапа

    inputList.forEach((inputElement) => {                                           //18. прохожусь по каждому элементу массива инпутов
        inputElement.addEventListener('input', () => {                              //19. при каждом нажатии клавиши в инпуте
            checkInputValidity(formElement, inputElement)                           //20. вызываю ф-ю проверки инпута на валидность

            toggleButtonState(inputList, buttonElement);                            //29. вызываю здесь ф-ю блок-и-разблок-и кнопки, при каждом нажатии клавиши
        });
    });
}; 

function enableValidation() {                                                       // 30. ф-я для вызыва функции-обработчика/проверки во всех формах                              
    const formtList = Array.from(document.querySelectorAll('.popup__form'));        // 31. нахожу все формы и делаю из них массив
     formtList.forEach((formElement) => {                                           // 32. прохожусь по каждому элементу массива с формами
       setEventListeners(formElement);                                              // 33. вызываю ф-ю обработчик во всех формах
    });
  };

enableValidation()                                                                  // 34. вызываю функцию для проверки всех форм на странице