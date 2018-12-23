'use strict';
(function () {
  // mouseup active state
  window.utils.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinTop = window.utils.mainPin.offsetTop - shift.y;
      var mainPinLeft = window.utils.mainPin.offsetLeft - shift.x;

      if (mainPinTop < window.draganddrop.MIN_ACTIVE_MAP_Y || mainPinTop > window.draganddrop.MAP_HEIGHT) {
        moveEvt.preventDefault();
      } else if (mainPinLeft < window.draganddrop.MIN_ACTIVE_MAP_X || mainPinLeft > window.draganddrop.MAP_WIDTH) {
        moveEvt.preventDefault();
      } else {
        window.utils.mainPin.style.top = mainPinTop + 'px';
        window.utils.mainPin.style.left = mainPinLeft + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var adFormDisabled = document.querySelector('.ad-form--disabled');
      var mapDisabled = document.querySelector('.map--faded');

      if (adFormDisabled && mapDisabled) {
        adFormDisabled.classList.remove('ad-form--disabled');
        mapDisabled.classList.remove('map--faded');
        window.utils.toggleForm();
        for (var i = 0; i < window.data.ads.length; i++) {
          window.utils.map.appendChild(window.pin.renderMapPin(window.data.ads[i]));
        }
      }

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          window.utils.mainPin.removeEventListener('click', onClickPreventDefault);
        };
        window.utils.mainPin.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.form.inputAddress.value = parseFloat(window.utils.mainPin.style.left + window.utils.PIN_WIDTH / 2) + ', ' + parseFloat(window.utils.mainPin.style.top + window.utils.PIN_HEIGHT);
    };
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  });
  window.draganddrop = {
    MAP_WIDTH: 1165,
    MAP_HEIGHT: 630,
    MIN_ACTIVE_MAP_X: 0,
    MIN_ACTIVE_MAP_Y: 130
  };
})();
