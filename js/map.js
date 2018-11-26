'use strict';

var getRandomElementFromArray = function (array) {
  var randomArray = Math.floor(Math.random() * array.length);
  return array[randomArray];
};

var LIST_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var LIST_PRICE = ['palace', 'flat', 'house', 'bungalo'];
var LIST_TIME = ['12:00', '13:00', '14:00'];
var LIST_FEATURES = ['wifi', 'dishwasher','parking', 'washer', 'elevator', 'conditioner'];
var LIST_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomInRange = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

var realtorsList = [
  {
    'autors': {
      'avatar': 'img/avatars/user{{xx}}.png'
    },
    'offer': {
      'title': getRandomElementFromArray(LIST_TITLE),
      'address': 'location.x, location.y',
      'price': getRandomInRange(1000, 1000000);
      'type': getRandomElementFromArray(LIST_PRICE),
      'rooms': getRandomInRange(1, 5);
      'guests':
      'checkin': getRandomElementFromArray(LIST_TIME),
      'checkout': getRandomElementFromArray(LIST_TIME),
      'features': getRandomElementFromArray(LIST_FEATURES),
      'description': '',
      'photos': getRandomElementFromArray(LIST_PHOTOS)
    },
    'location': {
      'x':
      'y': getRandomInRange(130, 630);
    }
  }
];
