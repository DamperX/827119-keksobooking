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

var PIN_X = '570';
var PIN_Y = '375';

var HOUSE_COAST = {
  'bungalo': {
    min: '0',
    placeholder: '0'
  },
  'flat': {
    min: '1000',
    placeholder: '1000'
  },
  'house': {
    min: '5000',
    placeholder: '5000'
  },
  'palace': {
    min: '10000',
    placeholder: '10000'
  }
};

var listTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var listPrice = ['palace', 'flat', 'house', 'bungalo'];
var listTime = ['12:00', '13:00', '14:00'];
var listFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var listPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var realtorsList = [];

var isAvailable = true;

var tokyoMap = document.querySelector('.map');
var pinMapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mainPin = tokyoMap.querySelector('.map__pin--main');
var pinPlace = document.querySelector('.map__pins');
var modalAdTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapContainer = document.querySelector('.map__filters-container');
var adForms = document.querySelector('.ad-form');
var formFieldsets = document.querySelectorAll('fieldset');
var formSelects = document.querySelectorAll('select');
var adressInput = adForms.querySelector('#address');

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

var createPin = function (realtor, index) {
  var pinElement = pinMapTemplate.cloneNode(true);

  pinElement.querySelector('img').src = realtor.author.avatar;
  pinElement.querySelector('img').alt = realtor.offer.title;
  pinElement.style.left = realtor.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = realtor.location.y - PIN_HEIGHT + 'px';
  pinElement.setAttribute('data-index', index);
  pinElement.addEventListener('click', openPopup);

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

var renderPinsOnMap = function (pins) {
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    pinFragment.appendChild(createPin(realtorsList[i], i));
  }

  pinPlace.appendChild(pinFragment);
};

// Активирует страницу
var activateForm = function () {
  tokyoMap.classList.remove('map--faded');
  adForms.classList.remove('ad-form--disabled');
};

var deactivateForm = function () {
  tokyoMap.classList.add('map--faded');
  adForms.classList.add('ad-form--disabled');
};

// Переключает активацю формы
var switchForm = function (tag, value) {
  for (var i = 0; i < tag.length; i++) {
    if (value === 'hide') {
      tag[i].disabled = true;
    } else if (value === 'show') {
      tag[i].disabled = false;
    }
  }
};

// Показывает интерфейс
var showInterface = function () {
  switchForm(formFieldsets, 'show');
  switchForm(formSelects, 'show');
  activateForm();
};

var hideInterface = function () {
  switchForm(formFieldsets, 'hide');
  switchForm(formSelects, 'hide');
  deactivateForm();
};

// Отрисовывает координаты пина
var setAddress = function () {
  adressInput.value = PIN_X + ', ' + PIN_Y;
};

var pressEscClose = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  if (tokyoMap.contains(tokyoMap.querySelector('.popup'))) {
    tokyoMap.querySelector('.popup').remove('popup');
    tokyoMap.querySelector('.map__pin--active').classList.remove('map__pin--active');
  }
};

var openPopup = function (evt) {
  if (tokyoMap.contains(tokyoMap.querySelector('.map__pin--active'))) {
    tokyoMap.querySelector('.map__pin--active').classList.remove('map__pin--active');
  }
  if (tokyoMap.contains(tokyoMap.querySelector('.popup'))) {
    tokyoMap.querySelector('.popup').remove('popup');
  }
  evt.currentTarget.classList.add('map__pin--active');
  tokyoMap.insertBefore(createNoticetOnMap(realtorsList[evt.currentTarget.dataset.index]), mapContainer);
  var popupClose = document.querySelector('.popup__close');
  popupClose.addEventListener('click', closePopup);
  document.addEventListener('keydown', pressEscClose);
};


mainPin.addEventListener('mouseup', function () {
  if (isAvailable) {
    showInterface();
    renderPinsOnMap(realtorsList);
    isAvailable = false;
  }
});

setAddress();
hideInterface();

var inputTitle = adForms.querySelector('#title');
var inputPrice = adForms.querySelector('#price');
var inputType = adForms.querySelector('#type');
var inputCapacity = adForms.querySelector('#capacity');
var inputRoomNumber = adForms.querySelector('#room_number');
var capacityOptions = inputCapacity.querySelectorAll('option');
var roomNumberOptions = inputRoomNumber.querySelectorAll('option');

inputTitle.addEventListener('invalid', function (evt) {
  if (inputTitle.validity.tooShort) {
    inputTitle.setCustomValidity('Минимальная длина 30 символов');
  } else if (inputTitle.validity.tooLong) {
    inputTitle.setCustomValidity('Максимальная длина 100 символов');
  } else if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('Обязательное поле');
  } else {
    inputTitle.setCustomValidity('');
  }
});

inputType.addEventListener('input', function () {
  switch (inputType.value) {
    case 'bungalo':
      inputPrice.min = HOUSE_COAST.bungalo.min;
      inputPrice.placeholder = HOUSE_COAST.bungalo.placeholder;
      return;
    case 'flat':
      inputPrice.min = HOUSE_COAST.flat.min;
      inputPrice.placeholder = HOUSE_COAST.flat.placeholder;
      return;
    case 'house':
      inputPrice.min = HOUSE_COAST.house.min;
      inputPrice.placeholder = HOUSE_COAST.house.placeholder;
      return;
    default:
      inputPrice.min = HOUSE_COAST.palace.min;
      inputPrice.placeholder = HOUSE_COAST.palace.placeholder;
      return;
  }
});

var synhCapacity = function () {
  for (var i = 0; i < capacityOptions.length; i++) {
    capacityOptions[i].disabled = false;
  }

  for (var t = 0; t < roomNumberOptions.length; t++) {
    if (roomNumberOptions[t].selected === true) {
      switch (roomNumberOptions[t].value) {
        case '1':
          capacityOptions[2].selected = true;
          capacityOptions[0].disabled = true;
          capacityOptions[1].disabled = true;
          capacityOptions[3].disabled = true;
          break;
        case '2':
          capacityOptions[1].selected = true;
          capacityOptions[0].disabled = true;
          capacityOptions[3].disabled = true;
          break;
        case '3':
          capacityOptions[0].selected = true;
          capacityOptions[3].disabled = true;
          break;
        case '100':
          capacityOptions[3].selected = true;
          capacityOptions[0].disabled = true;
          capacityOptions[1].disabled = true;
          capacityOptions[2].disabled = true;
          break;
      }
    }
  }
};

inputRoomNumber.addEventListener('change', synhCapacity);

