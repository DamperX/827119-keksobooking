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

var PHOTO_WIDTH = '40';
var PHOTO_HEIGHT = '40';

var PIN_WIDTH = '50';
var PIN_HEIGHT = '70';

var ESC_KEYCODE = 27;

var listTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var listPrice = ['palace', 'flat', 'house', 'bungalo'];
var listTime = ['12:00', '13:00', '14:00'];
var listFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var listPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var realtorsList = [];

var tokyoMap = document.querySelector('.map');
var pinMapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mainPin = tokyoMap.querySelector('.map__pin--main');
var pinAvatar = pinMapTemplate.querySelector('img');
var pinPlace = document.querySelector('.map__pins');
var modalAdTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapContainer = document.querySelector('.map__filters-container');
var adForm = document.querySelector('.ad-form');
var mapFilters = mapContainer.querySelector('.map__filters');
var formFieldset = document.querySelectorAll('fieldset');
var formSelect = document.querySelectorAll('select');
var mapOverlay = pinPlace.querySelector('.map__overlay');
var adressInput = adForm.querySelector('#address');

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

// Возвращает массив в случайном порядке
var getMixArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

var createAd = function () {
  for (var i = 0; i < REALTORS_COUNT; i++) {

    var locationX = getRandomInRange(MIN_X, MAX_X);
    var locationY = getRandomInRange(MIN_Y, MAX_Y);

    realtorsList[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': getRandomElementFromArray(listTitle),
        'address': locationX + ', ' + locationY,
        'price': getRandomInRange(MIN_PRICE, MAX_PRICE),
        'type': getRandomElementFromArray(listPrice),
        'rooms': getRandomInRange(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomInRange(MIN_GUESTS, MAX_GUESTS),
        'checkin': getRandomElementFromArray(listTime),
        'checkout': getRandomElementFromArray(listTime),
        'features': listFeatures,
        'description': '',
        'photos': getMixArray(listPhotos)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }
  return realtorsList;
};

createAd();

var createPin = function (realtor) {
  var pinElement = pinMapTemplate.cloneNode(true);

  pinMapTemplate.style.left = realtor.location.x - PIN_WIDTH + 'px';
  pinMapTemplate.style.top = realtor.location.y - PIN_HEIGHT + 'px';
  pinAvatar.src = realtor.author.avatar;
  pinAvatar.alt = realtor.offer.title;

  return pinElement;
};

var getHouseType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'palace':
      return 'Дворец';
    default:
      return 'Дом';
  }
};

var createNoticetOnMap = function (notice) {
  var noticeElement = modalAdTemplate.cloneNode(true);

  noticeElement.querySelector('.popup__title').textContent = notice.offer.title;
  noticeElement.querySelector('.popup__text--address').textContent = notice.offer.adress;
  noticeElement.querySelector('.popup__text--price').textContent = notice.offer.price + ' ₽/ночь';
  noticeElement.querySelector('.popup__description').textContent = notice.offer.description;
  noticeElement.querySelector('.popup__avatar').src = notice.author.avatar;
  noticeElement.querySelector('.popup__type').textContent = getHouseType(notice.offer.type);
  noticeElement.querySelector('.popup__text--capacity').textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';
  noticeElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;

  var featuresList = noticeElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  var featuresFragment = document.createDocumentFragment();
  for (var k = 0; k < notice.offer.features.length; k++) {
    var featureElement = document.createElement('li');

    featureElement.classList = 'popup__feature popup__feature--' + notice.offer.features[k];
    featuresFragment.appendChild(featureElement);
  }
  featuresList.appendChild(featuresFragment);

  var photosList = noticeElement.querySelector('.popup__photos');
  photosList.innerHTML = '';
  var photosFragment = document.createDocumentFragment();
  for (var j = 0; j < notice.offer.photos.length; j++) {
    var photoElement = document.createElement('img');
    photoElement.classList.add('.popup__photo');
    photoElement.src = notice.offer.photos[j];
    photoElement.width = PHOTO_WIDTH;
    photoElement.height = PHOTO_HEIGHT;
    photosFragment.appendChild(photoElement);
  }
  photosList.appendChild(photosFragment);

  return noticeElement;
};

var renderPinsOnMap = function () {
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < realtorsList.length; i++) {
    pinFragment.appendChild(createPin(realtorsList[i]));
  }

  pinPlace.appendChild(pinFragment);
};

var includeNoticeOnMap = function () {
  tokyoMap.insertBefore(createNoticetOnMap(realtorsList[0]), mapContainer);
};

// Показывает карту
var deleteMapFaded = function () {
  tokyoMap.classList.remove('map--faded');
};

// Показывает форму объявления
var showForm = function () {
  adForm.classList.remove('ad-form--disabled');
};

// Переключает активацю формы
var switchForm = function (tag, boolean) {
  for (var i = 0; i < tag.length; i++) {
    tag[i].disabled = boolean;
  }
};

var switchDisable = function (bool) {
  if (bool) {
    switchForm(formFieldset, true);
    switchForm(formSelect, true);
  } else {
    switchForm(formFieldset, false);
    switchForm(formSelect, false);
  }
};

// Показывает интерфейс
var showInterface = function () {
  deleteMapFaded();
  showForm();
  renderPinsOnMap();
  switchDisable(false);
};
// Скрывает интрефейс
var hideInterface = function () {
  switchDisable(true);
};

var setAddress = function (evt) {
  var pinRect = mainPin.getBoundingClientRect();
  var bodyRect = document.body.getBoundingClientRect();

  var offsetX = pinRect.left - bodyRect.left + Math.round(mainPin.offsetWidth / 2);
  var offsetY = pinRect.top - bodyRect.top + Math.round(mainPin.offsetHeight);

  adressInput.value = offsetX + ', ' + offsetY;
};

mainPin.addEventListener('mouseup', showInterface);

hideInterface();
includeNoticeOnMap();
setAddress();
