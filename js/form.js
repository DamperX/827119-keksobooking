'use strict';

(function () {
  var PIN_X = '570';
  var PIN_Y = '375';

  var AccomodationType = {
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

  var adForms = document.querySelector('.ad-form');
  var inputTitle = adForms.querySelector('#title');
  var inputPrice = adForms.querySelector('#price');
  var inputType = adForms.querySelector('#type');
  var inputCapacity = adForms.querySelector('#capacity');
  var inputRoomNumber = adForms.querySelector('#room_number');
  var capacityOptions = inputCapacity.querySelectorAll('option');
  var roomNumberOptions = inputRoomNumber.querySelectorAll('option');
  var inputTimeIn = adForms.querySelector('#timein');
  var inputTimeOut = adForms.querySelector('#timeout');
  var adressInput = adForms.querySelector('#address');
  var formFieldsets = document.querySelectorAll('fieldset');
  var formSelects = document.querySelectorAll('select');

  inputTitle.addEventListener('invalid', function () {
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

  var synchPrice = function () {
    switch (inputType.value) {
      case 'bungalo':
        inputPrice.min = AccomodationType.bungalo.min;
        inputPrice.placeholder = AccomodationType.bungalo.placeholder;
        return;
      case 'flat':
        inputPrice.min = AccomodationType.flat.min;
        inputPrice.placeholder = AccomodationType.flat.placeholder;
        return;
      case 'house':
        inputPrice.min = AccomodationType.house.min;
        inputPrice.placeholder = AccomodationType.house.placeholder;
        return;
      default:
        inputPrice.min = AccomodationType.palace.min;
        inputPrice.placeholder = AccomodationType.palace.placeholder;
        return;
    }
  };

  synchPrice();

  var synchCapacity = function () {
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

  synchCapacity();

  inputType.addEventListener('change', synchPrice);
  inputRoomNumber.addEventListener('change', synchCapacity);

  inputTimeIn.addEventListener('change', function (evt) {
    inputTimeOut.value = evt.target.value;
  });

  inputTimeOut.addEventListener('change', function (evt) {
    inputTimeIn.value = evt.target.value;
  });

  var activateForm = function () {
    adForms.classList.remove('ad-form--disabled');
  };

  var deactivateForm = function () {
    adForms.classList.add('ad-form--disabled');
  };

  var switchForm = function (tag, value) {
    for (var i = 0; i < tag.length; i++) {
      if (value === 'hide') {
        tag[i].disabled = true;
      } else if (value === 'show') {
        tag[i].disabled = false;
      }
    }
  };

  var setAdressDefault = function () {
    adressInput.value = PIN_X + ', ' + PIN_Y;
  };



  adForms.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData, window.utils.insertSuccessMessage, window.utils.insertErrorMessage);
    evt.preventDefault();
  });

  setAdressDefault();

  window.form = {
    setAdress: function () {
      adressInput.value = Math.floor(window.mainPin.offsetLeft + window.mainPin.offsetWidth / 2) + ', ' + Math.floor(window.mainPin.offsetTop + window.mainPin.offsetHeight);
    },

    showForm: function () {
      switchForm(formFieldsets, 'show');
      switchForm(formSelects, 'show');
      activateForm();
    },

    hideForm: function () {
      switchForm(formFieldsets, 'hide');
      switchForm(formSelects, 'hide');
      deactivateForm();
    }
  };
})();
