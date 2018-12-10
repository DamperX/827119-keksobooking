'use strict';

(function () {
  window.REALTORS_COUNT = 8;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  var MIN_GUESTS = 1;
  var MAX_GUESTS = 5;

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;

  var listTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var listPrice = ['palace', 'flat', 'house', 'bungalo'];
  var listTime = ['12:00', '13:00', '14:00'];
  var listFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var listPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var realtorsList = [];

  var createAd = function () {
    for (var i = 0; i < window.REALTORS_COUNT; i++) {

      var locationX = window.utils.getRandomInRange(0, 1200);
      var locationY = window.utils.getRandomInRange(130, 630);

      realtorsList[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': window.utils.getRandomElementFromArray(listTitle),
          'address': locationX + ', ' + locationY,
          'price': window.utils.getRandomInRange(MIN_PRICE, MAX_PRICE),
          'type': window.utils.getRandomElementFromArray(listPrice),
          'rooms': window.utils.getRandomInRange(MIN_ROOMS, MAX_ROOMS),
          'guests': window.utils.getRandomInRange(MIN_GUESTS, MAX_GUESTS),
          'checkin': window.utils.getRandomElementFromArray(listTime),
          'checkout': window.utils.getRandomElementFromArray(listTime),
          'features': listFeatures,
          'description': '',
          'photos': window.utils.getMixArray(listPhotos)
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      };
    }
    return realtorsList;
  };

  window.realtorsList = createAd();
})();
