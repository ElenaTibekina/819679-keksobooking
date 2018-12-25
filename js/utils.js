'use strict';
(function () {
  // переключатель
  var toggleForm = function () {
    var fieldsets = document.querySelectorAll('fieldset');
    for (var i; i < fieldsets.length; i++) {
      if (fieldsets.disabled) {
        window.utils.adForm.classList.remove('disabled');
      } else {
        window.utils.adForm.classList.add('disabled');
      }
    }
  };

  // случайное значение в диапазоне
  var getValueInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // случайное значение из массива
  var getRandomValue = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.utils = {
    toggleForm: toggleForm,
    getRandomValue: getRandomValue,
    getValueInRange: getValueInRange,
    PIN_WIDTH: 46,
    PIN_HEIGHT: 64,
    ESC_KEYCODE: 27,
    cardElement: null,
    map: document.querySelector('.map'),
    adForm: document.querySelector('.ad-form'),
    mainPin: document.querySelector('.map__pin--main'),
    currentCard: null
  };
})();
