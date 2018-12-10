'use strict';

(function () {
  window.utils = {
    // Возвращает случайное число из диапазона
    getRandomInRange: function (min, max) {
      var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNumber;
    },

    // Возвращает случайный элемент массива
    getRandomElementFromArray: function (array) {
      var randomArray = Math.floor(Math.random() * array.length);
      return array[randomArray];
    },

    // Возвращает массив в случайном порядке
    getMixArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
      return array;
    }
  };
})();
