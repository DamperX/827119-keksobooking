'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var isAvailable = true;

  var tokyoMap = document.querySelector('.map');
  var mapContainer = document.querySelector('.map__filters-container');
  window.mainPin = tokyoMap.querySelector('.map__pin--main');

  var fadeMap = function () {
    tokyoMap.classList.add('map--faded');
  };

  var showMap = function () {
    tokyoMap.classList.remove('map--faded');
  };

  var hideInterface = function () {
    fadeMap();
    window.form.hideForm();
  };

  var showInterface = function () {
    showMap();
    window.form.showForm();
    window.backend.download(window.pins.renderPinsOnMap(window.data.realtorsList), window.utils.insertErrorMessage);
  };

  var pressEscClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    if (tokyoMap.contains(tokyoMap.querySelector('.popup'))) {
      tokyoMap.querySelector('.popup').remove('popup');
      tokyoMap.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };

  window.openPopup = function (evt) {
    if (tokyoMap.contains(tokyoMap.querySelector('.map__pin--active'))) {
      tokyoMap.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
    if (tokyoMap.contains(tokyoMap.querySelector('.popup'))) {
      tokyoMap.querySelector('.popup').remove('popup');
    }
    evt.currentTarget.classList.add('map__pin--active');
    tokyoMap.insertBefore(window.card.createNoticetOnMap(window.data.realtorsList[evt.currentTarget.dataset.index]), mapContainer);
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', closePopup);
    document.addEventListener('keydown', pressEscClose);
  };

  window.mainPin.addEventListener('mouseup', function () {
    if (isAvailable) {
      showInterface();
      window.backend.download(window.pins.renderPinsOnMap(window.data.realtorsList), window.utils.insertErrorMessage);
      isAvailable = false;
    }
  });

  hideInterface();

})();
