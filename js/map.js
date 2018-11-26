'use strict';
var REALTORS_COUNT = 8;

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_GUESTS = 1;
var MAX_GUESTS = 5;

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var MIN_X = 0;
var MAX_X = 0;

var MIN_Y = 130;
var MAX_Y = 630;

var LIST_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var LIST_PRICE = ['palace', 'flat', 'house', 'bungalo'];
var LIST_TIME = ['12:00', '13:00', '14:00'];
var LIST_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var LIST_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var realtorsList = [];

var tokyoMap = document.querySelector('.map');
tokyoMap.classList.remove('map--faded');

// Возвращает случайное число из диапазона
var getRandomInRange = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

// Возвращает случайный элемент массива
var getRandomElementFromArray = function (array) {
  var randomArray = Math.floor(Math.random() * array.length);
  return array[randomArray];
};

var createRealtor = function () {
  for (var i = 0; i < REALTORS_COUNT; i++) {

    var locationX = getRandomInRange(MIN_X, MAX_X);
    var locationY = getRandomInRange(MIN_Y, MAX_Y);

    realtorsList[i] = [
      {
        'autors': {
          'avatar': 'img/avatars/user0' + getRandomInRange(1, 8) + '.png'
        },
        'offer': {
          'title': getRandomElementFromArray(LIST_TITLE),
          'address': locationX + ',' + locationY,
          'price': getRandomInRange(MIN_PRICE, MAX_PRICE),
          'type': getRandomElementFromArray(LIST_PRICE),
          'rooms': getRandomInRange(MIN_ROOMS, MAX_ROOMS),
          'guests': getRandomInRange(MIN_GUESTS, MAX_GUESTS),
          'checkin': getRandomElementFromArray(LIST_TIME),
          'checkout': getRandomElementFromArray(LIST_TIME),
          'features': getRandomElementFromArray(LIST_FEATURES),
          'description': '',
          'photos': getRandomElementFromArray(LIST_PHOTOS)
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      }
    ];
  }
};

createRealtor();
