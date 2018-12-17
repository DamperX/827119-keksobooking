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
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ESC) {
        closeErrorMessage();
      }
    });
    errorElement.addEventListener('click', closeErrorMessage);
    errorBtn.addEventListener('click', closeErrorMessage);
  };

  var closeErrorMessage = function () {
    var modalError = document.querySelector('.error');
    indexMain.removeChild(modalError);
    document.removeEventListener('keydown', closeErrorMessage);
    modalError.removeEventListener('click', closeErrorMessage);
  };

  var insertSuccessMessage = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successElement = success.cloneNode(true);
    indexMain.appendChild(successElement);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.ESC) {
        closeSuccessMessage();
      }
    });
    successElement.addEventListener('click', closeSuccessMessage);
  };

  var closeSuccessMessage = function () {
    var modalSucces = document.querySelector('.success');
    indexMain.removeChild(modalSucces);
    document.removeEventListener('keydown', closeSuccessMessage);
    modalSucces.removeEventListener('click', closeSuccessMessage);
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

