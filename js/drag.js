'use strict';

(function () {

  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var CENTER_X = window.map.tokyoMap.offsetWidth / 2 - window.map.mainPin.offsetWidth / 2;
  var CENTER_Y = window.map.tokyoMap.offsetHeight / 2 - window.map.mainPin.offsetHeight / 2;

  window.map.mainPin.addEventListener('mousedown', function (evt) {
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
        return window.map.mainPin.offsetTop - shift.y < MAX_Y - window.map.mainPin.offsetHeight && window.map.mainPin.offsetTop - shift.y > MIN_Y - window.map.mainPin.offsetHeight;
      };

      var getPinLeft = function () {
        return window.map.mainPin.offsetLeft - shift.x < MAX_X - window.map.mainPin.offsetWidth && window.map.mainPin.offsetLeft - shift.x > MIN_X;
      };

      if (getPinTop()) {
        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
      }
      if (getPinLeft()) {
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
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

  var getDefaultPosition = function () {
    window.map.mainPin.style = 'left: ' + CENTER_X + 'px; top: ' + CENTER_Y + 'px;';
  };

  window.drag = {
    getDefaultPosition: getDefaultPosition
  };
})();
