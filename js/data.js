'use strict';

(function () {
  window.realtorsList = [];

  var getArrayRealtos = function (serverData) {
    window.realtorsList = serverData;
  };

  window.backend.download(getArrayRealtos, window.utils.insertErrorMessage);
})();
