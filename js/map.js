'use strict';

(function () {
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
    window.form.hide();
    window.form.setAdress();
  };

  var showInterface = function () {
    showMap();
    window.form.show();
  };

  var pressEscClose = function (evt) {
    if (evt.keyCode === window.constants.Keycodes.ESC) {
      closePopup();
    }
  };

  var closePopup = function () {
    if (tokyoMap.contains(tokyoMap.querySelector('.popup'))) {
      tokyoMap.querySelector('.popup').remove('popup');
      tokyoMap.querySelector('.map__pin--active').classList.remove('map__pin--active');
      document.removeEventListener('keydown', pressEscClose);
    }
  };

  var getRealtorsList = function (serverData) {
    window.realtorsList = serverData;
    for (var i = 0; i < window.realtorsList.length; i++) {
      window.realtorsList[i].index = i;
    }
    window.pins.renderPinsOnMap(window.realtorsList);
  };

  var activateInterface = function () {
    showInterface();
    window.backend.download(getRealtorsList, window.utils.insertErrorMessage);
    window.mainPin.removeEventListener('mouseup', activateInterface);
    window.mainPin.removeEventListener('keydown', pressEnterShow);
    window.form.setAdress();
  };

  var pressEnterShow = function (evt) {
    if (evt.keyCode === window.constants.Keycodes.ENTER) {
      activateInterface();
    }
  };

  var openPopup = function (evt) {
    if (tokyoMap.contains(tokyoMap.querySelector('.map__pin--active'))) {
      tokyoMap.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
    if (tokyoMap.contains(tokyoMap.querySelector('.popup'))) {
      tokyoMap.querySelector('.popup').remove('popup');
    }
    var currentElement = evt.currentTarget;
    currentElement.classList.add('map__pin--active');
    tokyoMap.insertBefore(window.card.createNoticetOnMap(window.realtorsList[currentElement.dataset.index]), mapContainer);
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', closePopup);
    document.addEventListener('keydown', pressEscClose);
  };

  window.mainPin.addEventListener('mouseup', activateInterface);
  window.mainPin.addEventListener('keydown', pressEnterShow);

  hideInterface();

  window.map = {
    activateInterface: activateInterface,
    openPopup: openPopup,
    closePopup: closePopup,
    hideInterface: hideInterface
  };

})();
