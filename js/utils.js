'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var indexMain = document.querySelector('main');

  var insertErrorMessage = function (message) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorBtn = errorElement.querySelector('.error__button');

    errorMessage.textContent = message;

    indexMain.insertAdjacentElement('afterbegin', errorElement);
    document.addEventListener('keydown', closeErrorMessage);
    errorElement.addEventListener('click', closeErrorMessage);
    errorBtn.addEventListener('click', closeErrorMessage);
  };

  var closeErrorMessage = function () {
    var modalError = document.querySelector('.error');
    indexMain.removeChild(modalError);
    document.removeEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeErrorMessage();
      }
    });
    modalError.removeEventListener('click', closeErrorMessage);
  };

  var insertSuccessMessage = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successElement = success.cloneNode(true);
    indexMain.appendChild(successElement);
    document.addEventListener('keydown', closeSuccessMessage);
    successElement.addEventListener('click', closeSuccessMessage);
  };

  var closeSuccessMessage = function () {
    var modalSucces = document.querySelector('.success');
    indexMain.removeChild(successElement);
    document.removeEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeSuccessMessage();
      }
    });
    successElement.removeEventListener('click', closeSuccessMessage);
  };

  window.utils = {
    ESC: ESC_KEYCODE,
    insertErrorMessage: insertErrorMessage,
    insertSuccessMessage: insertSuccessMessage
  };

})();
