'use strict';

(function () {
  var PIN_WIDTH = '50';
  var PIN_HEIGHT = '70';

  var pinMapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinPlace = document.querySelector('.map__pins');

  var createPin = function (realtor, index) {
    var pinElement = pinMapTemplate.cloneNode(true);

    pinElement.querySelector('img').src = realtor.author.avatar;
    pinElement.querySelector('img').alt = realtor.offer.title;
    pinElement.style.left = realtor.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = realtor.location.y - PIN_HEIGHT + 'px';
    pinElement.setAttribute('data-index', index);
    pinElement.addEventListener('click', window.openPopup);

    return pinElement;
  };

  window.pins = {
    renderPinsOnMap: function (pins) {
      var pinFragment = document.createDocumentFragment();

      for (var i = 0; i < pins.length; i++) {
        pinFragment.appendChild(createPin(window.realtorsList[i], i));
      }

      pinPlace.appendChild(pinFragment);
    }
  };
})();
