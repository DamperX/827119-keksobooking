'use strict';

(function () {
  var tokyoMap = document.querySelector('.map');
  var mapContainer = document.querySelector('.map__filters-container');
  var mainPin = tokyoMap.querySelector('.map__pin--main');

  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;

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
  };

  var pressEscClose = function (evt) {
    if (evt.keyCode === window.constants.ESC) {
      closePopup();
    }
  };

  var closePopup = function () {
    if (tokyoMap.contains(tokyoMap.querySelector('.popup'))) {
      tokyoMap.querySelector('.popup').remove('popup');
      tokyoMap.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };

  var getRealtorsList = function (serverData) {
    window.realtorsList = serverData;
    window.pins.renderPinsOnMap(window.realtorsList);
  };

  var activateInterface = function (evt) {
    showInterface();
    window.form.setAdress();
    window.backend.download(getRealtorsList, window.utils.insertErrorMessage);
    mainPin.removeEventListener('mouseup', activateInterface);
  };

  var openPopup = function (evt) {
    if (tokyoMap.contains(tokyoMap.querySelector('.map__pin--active'))) {
      tokyoMap.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
    if (tokyoMap.contains(tokyoMap.querySelector('.popup'))) {
      tokyoMap.querySelector('.popup').remove('popup');
    }
    evt.currentTarget.classList.add('map__pin--active');
    tokyoMap.insertBefore(window.card.createNoticetOnMap(window.realtorsList[evt.currentTarget.dataset.index]), mapContainer);
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', closePopup);
    document.addEventListener('keydown', pressEscClose);
  };

  mainPin.addEventListener('mouseup', activateInterface);

  hideInterface();

  window.map = {
    activateInterface: activateInterface,
    mainPinWidth: mainPinWidth,
    mainPinHeight: mainPinHeight,
    tokyoMap: tokyoMap,
    mainPin: mainPin,
    openPopup: openPopup,
    closePopup: closePopup,
    hideInterface: hideInterface
  };

})();
