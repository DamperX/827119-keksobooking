'use strict';

(function () {
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var xhrRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка загрузки данных ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('error', function () {
      onError('Не удалось загрузить данные');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  };

  var download = function (onLoad, onError) {
    var xhr = xhrRequest(onLoad, onError);
    xhr.open('GET', window.constants.AdressUrl.DOWNLOAD);
    xhr.send();
  };

  var upload = function (onLoad, onError, data) {
    var xhr = xhrRequest(onLoad, onError);
    xhr.open('POST', window.constants.AdressUrl.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };

})();
