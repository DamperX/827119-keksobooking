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

  var getTypeChange = function (realtors) {
    if (typeSelect.value === 'any') {
      return true;
    } else {
      return realtors.offer.type === typeSelect.value;
    }
  };

  var getPriceChange = function (realtors) {
    switch (priceSelect.value) {
      case 'low':
        return realtors.offer.price <= HousingPriceValue.low.maxPrice;
      case 'middle':
        return realtors.offer.price <= HousingPriceValue.middle.minPrice && realtors.offer.price <= HousingPriceValue.middle.maxPrice;
      case 'heigh':
        return realtors.offer.price >= HousingPriceValue.heigh.minPrice;
      default:
        return true;
    }
  };

  var getRoomsChange = function (realtors) {
    if (roomsSelect.value === 'any') {
      return true;
    }

    return realtors.offer.rooms === parseInt(roomsSelect.value, 10);
  };

  var getGuestsChange = function (realtors) {
    if (guestsSelect.value === 'any') {
      return true;
    }

    return realtors.offer.guests === parseInt(guestsSelect.value, 10);
  };

  var getFutureChange = function (realtors) {
    for (var i = 0; i < featuresCheckboxes.length; i++) {
      if (featuresCheckboxes[i].checked && realtors.offer.features.indexOf(featuresCheckboxes[i].value) < 0) {
        return false;
      }
    }
    return true;
  };

  var getFilterRealtors = function () {
    var realtorsCopy = window.realtorsList.slice();
    var filterdList = realtorsCopy.filter(function (realtors) {
      return getTypeChange(realtors) && getPriceChange(realtors) && getRoomsChange(realtors) && getGuestsChange(realtors) && getFutureChange(realtors);
    });

    window.map.closePopup();
    window.pins.removePinsOnMap();
    window.pins.renderPinsOnMap(filterdList);
  };

  mapFilters.addEventListener('change', getFilterRealtors);
})();
