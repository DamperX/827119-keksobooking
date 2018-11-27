'use strict';
var REALTORS_COUNT = 8;

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_GUESTS = 1;
var MAX_GUESTS = 5;

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var MIN_X = 1;
var MAX_X = 1200;

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
var pinMapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinAvatar = pinMapTemplate.querySelector('img');
var pinPlace = document.querySelector('.map__pins');
var modalAdTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapContainer = document.querySelector('.map__filters-container');

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

    realtorsList[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
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
        'features': LIST_FEATURES,
        'description': '',
        'photos': LIST_PHOTOS
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }
  return realtorsList;
};

createRealtor();

var createPin = function (realtor) {
  var pinElement = pinMapTemplate.cloneNode(true);

  pinMapTemplate.style.left = realtor.location.x + 'px';
  pinMapTemplate.style.top = realtor.location.y + 'px';
  pinAvatar.src = realtor.author.avatar;
  pinAvatar.alt = realtor.offer.title;

  return pinElement;
};

var getHouseType = function (type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  } else if (type === 'palace') {
    return 'Дворец';
  } else {
    return 'Дом';
  }
};

var createNoticetOnMap = function (notice) {
  var noticeElement = modalAdTemplate.cloneNode(true);

  noticeElement.querySelector('.popup__title').textContent = notice.offer.title;
  noticeElement.querySelector('.popup__text--address').textContent = notice.offer.adress;
  noticeElement.querySelector('.popup__text--price').textContent = notice.offer.price + '₽/ночь';
  noticeElement.querySelector('.popup__description').textContent = notice.offer.description;
  noticeElement.querySelector('.popup__avatar').src = notice.author.avatar;
  noticeElement.querySelector('.popup__type').textContent = getHouseType(notice.offer.type);
  noticeElement.querySelector('.popup__text--capacity').textContent = notice.offer.rooms + 'комнаты для' + notice.offer.guests + 'гостей';
  noticeElement.querySelector('.popup__text--time').textContent = 'Заезд после' + notice.offer.checkin + ', выезд до' + notice.offer.checkout;

  var featuresElements = noticeElement.querySelector('.popup__features');
  for (var t = 0; t < notice.offer.features.length; t++) {
    var pinFeature = document.createElement('li');
    pinFeature.classList = 'popup__feature popup__feature--' + notice.offer.features[t];
    featuresElements.appendChild(pinFeature);
  }

  var photosElement = noticeElement.querySelector('.popup__photos');
  for (var j = 0; j < notice.offer.photos.length; j++) {
    var pinPhoto = document.createElement('img');
    pinPhoto.classList.add('.popup__photo');
    pinPhoto.src = notice.offer.photos[j];
    photosElement.appendChild(pinPhoto);
  }

  return noticeElement;
};

var includePinOnMap = function () {
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < realtorsList.length; i++) {
    pinFragment.appendChild(createPin(realtorsList[i]));
  }

  pinPlace.appendChild(pinFragment);
};

includePinOnMap();

var includeNoticeOnMap = function () {
  var noticeFragment = document.createDocumentFragment();

  for (var i = 0; i < realtorsList.length; i++) {
    noticeFragment.appendChild(createNoticetOnMap(realtorsList[i]));
  }
  tokyoMap.insertBefore(createNoticetOnMap(realtorsList[0]), mapContainer);
};

includeNoticeOnMap();
