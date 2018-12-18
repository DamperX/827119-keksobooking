'use strict';

(function () {

  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;

  window.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var getPinTop = function () {
        return window.mainPin.offsetTop - shift.y < MAX_Y - window.mainPin.offsetHeight && window.mainPin.offsetTop - shift.y > MIN_Y - window.mainPin.offsetHeight;
      };

      var getPinLeft = function () {
        return window.mainPin.offsetLeft - shift.x < MAX_X - window.mainPin.offsetWidth && window.mainPin.offsetLeft - shift.x > MIN_X;
      };

      if (getPinTop()) {
        window.mainPin.style.top = (window.mainPin.offsetTop - shift.y) + 'px';
      }
      if (getPinLeft()) {
        window.mainPin.style.left = (window.mainPin.offsetLeft - shift.x) + 'px';
      }
      window.form.setAdress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document. addEventListener('mouseup', onMouseUp);

  });

  var mainPinX = window.mainPin.offsetLeft;
  var mainPinY = window.mainPin.offsetTop;

  var getDefaultPosition = function () {
    window.mainPin.style.left = mainPinX + 'px';
    window.mainPin.style.top = mainPinY + 'px';
    window.form.setAdress();
  };

  window.drag = {
    getDefaultPosition: getDefaultPosition
  };
})();
