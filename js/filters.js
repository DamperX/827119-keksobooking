'use strict';

(function () {
  var HousingPriceValue = {
    low: {
      minPrice: 0,
      maxPrice: 10000
    },
    middle: {
      minPrice: 10000,
      maxPrice: 50000
    },
    heigh: {
      minPrice: 50000,
      maxPrice: Infinity
    }
  };

  var mapFilters = document.querySelector('.map__filters');
  var typeSelect = mapFilters.querySelector('#housing-type');
  var priceSelect = mapFilters.querySelector('#housing-price');
  var roomsSelect = mapFilters.querySelector('#housing-rooms');
  var guestsSelect = mapFilters.querySelector('#housing-guests');
  var featuresCheckboxes = document.querySelectorAll('.map__checkbox');

  var getTypeChange = function (realtor) {
    if (typeSelect.value === 'any') {
      return true;
    } else {
      return realtor.offer.type === typeSelect.value;
    }
  };

  var getPriceChange = function (realtor) {
    switch (priceSelect.value) {
      case 'low':
        return realtor.offer.price <= HousingPriceValue.low.maxPrice;
      case 'middle':
        return realtor.offer.price >= HousingPriceValue.middle.minPrice && realtor.offer.price <= HousingPriceValue.middle.maxPrice;
      case 'heigh':
        return realtor.offer.price >= HousingPriceValue.heigh.minPrice;
      default:
        return true;
    }
  };

  var getRoomsChange = function (realtor) {
    if (roomsSelect.value === 'any') {
      return true;
    }

    return realtor.offer.rooms === Number(roomsSelect.value);
  };

  var getGuestsChange = function (realtor) {
    if (guestsSelect.value === 'any') {
      return true;
    }

    return realtor.offer.guests === Number(roomsSelect.value);
  };

  var getFutureChange = function (realtor) {
    for (var i = 0; i < featuresCheckboxes.length; i++) {
      if (featuresCheckboxes[i].checked && realtor.offer.features.indexOf(featuresCheckboxes[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var getFilterRealtors = function () {
    var realtorsCopy = window.realtorsList.slice();
    var filterdList = realtorsCopy.filter(function (realtor) {
      return getTypeChange(realtor) && getPriceChange(realtor) && getRoomsChange(realtor) && getGuestsChange(realtor) && getFutureChange(realtor);
    });

    window.map.closePopup();
    window.pins.removePinsOnMap();
    window.pins.renderPinsOnMap(filterdList);
  };

  mapFilters.addEventListener('change', window.utils.debounce(getFilterRealtors));
})();
