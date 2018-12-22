'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var indexMain = document.querySelector('main');

  var insertErrorMessage = function (message) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorBtn = errorElement.querySelector('.error__button');

    errorMessage.textContent = message;

    indexMain.appendChild(errorElement);

    errorElement.addEventListener('click', function () {
      indexMain.removeChild(errorElement);
      document.removeEventListener('keydown', closeErrorMessage);
      errorElement.removeEventListener('click', closeErrorMessage);
      errorBtn.removeEventListener('click', closeErrorMessage);
    });

    errorBtn.addEventListener('click', function () {
      indexMain.removeChild(errorElement);
      document.removeEventListener('keydown', closeErrorMessage);
      errorBtn.removeEventListener('click', closeErrorMessage);
      errorElement.removeEventListener('click', closeErrorMessage);
    });
    document.addEventListener('keydown', closeErrorMessage);
  };

  var closeErrorMessage = function (evt) {
    var modalError = document.querySelector('.error');
    if (evt.keyCode === window.constants.Keycodes.ESC) {
      indexMain.removeChild(modalError);
      document.removeEventListener('keydown', closeErrorMessage);
    }
  };

  var insertSuccessMessage = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successElement = success.cloneNode(true);
    indexMain.appendChild(successElement);
    successElement.addEventListener('click', function () {
      indexMain.removeChild(successElement);
      document.removeEventListener('keydown', closeSuccessMessage);
      successElement.removeEventListener('click', closeSuccessMessage);
    });
    document.addEventListener('keydown', closeSuccessMessage);
  };

  var closeSuccessMessage = function (evt) {
    var modalSucces = document.querySelector('.success');
    if (evt.keyCode === window.constants.Keycodes.ESC) {
      indexMain.removeChild(modalSucces);
      document.removeEventListener('keydown', closeSuccessMessage);
    }
  };

  var debounce = function (cb) {
    var lastTimeout;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    debounce: debounce,
    insertErrorMessage: insertErrorMessage,
    insertSuccessMessage: insertSuccessMessage
  };

})();

