'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var load = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000; // 10s

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  };
  load(onSuccess, onError);
  function onSuccess(data) {
    window.array = {
      ads: data
    };
    window.draganddrop.mouseDownEventListener();
  }
  function onError(message) {
    var errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorPopupTemplate.cloneNode(true);
    errorElement.textContent = message;
    var main = document.querySelector('main');
    main.appendChild(errorElement);
  }
  window.backend = {
    load: load
  };
})();
