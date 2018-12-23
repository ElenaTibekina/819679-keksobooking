'use strict';
(function () {
  // synch #type and #price
  var synchTypeAndPrice = function () {
    if (window.form.inputTypeHouse.value === 'bungalo') {
      window.form.inputPrice.placeholder = '0';
    } else if (window.form.inputTypeHouse.value === 'flat') {
      window.form.inputPrice.placeholder = '1000';
    } else if (window.form.inputTypeHouse.value === 'house') {
      window.form.inputPrice.placeholder = '5000';
    } else if (window.form.inputTypeHouse.value === 'palace') {
      window.form.inputPrice.placeholder = '10000';
    }
  };

  var minPriceAndTypeDependence = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var synchTypeAndMinPrice = function () {
    window.form.inputPrice.min = minPriceAndTypeDependence[window.form.inputTypeHouse.value];
  };

  window.form.inputTypeHouse.addEventListener('change', synchTypeAndMinPrice);
  window.form.inputTypeHouse.addEventListener('change', synchTypeAndPrice);

  // synch checktime
  var selectCheckIn = window.form.adForm.querySelector('#timein');
  var selectCheckOut = window.form.adForm.querySelector('#timeout');

  var synchCheckTime = function (selectIn, selectOut) {
    if (selectIn.value === '12:00') {
      selectOut.value = '12:00';
    } else if (selectIn.value === '13:00') {
      selectOut.value = '13:00';
    } else if (selectIn.value === '14:00') {
      selectOut.value = '14:00';
    }
  };

  selectCheckIn.addEventListener('change', function () {
    synchCheckTime(selectCheckIn, selectCheckOut);
  });

  selectCheckOut.addEventListener('change', function () {
    synchCheckTime(selectCheckOut, selectCheckIn);
  });

  // synch rooms and guests
  var inputRoomNumber = window.utils.adForm.querySelector('#room_number');
  var inputCapacity = window.utils.adForm.querySelector('#capacity');

  var roomDependence = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['2', '3'],
    '100': ['0']
  };

  inputRoomNumber.addEventListener('change', function (event) {
    var value = event.target.value;
    var availableOptions = roomDependence[value];
    lockUnavailableOptions(inputCapacity, availableOptions, value);
  });

  var lockUnavailableOptions = function (selectElement, availableOptions, value) {
    var options = selectElement.childNodes;
    if (!value) {
      options.forEach(function (option) {
        option.disabled = false;
      });
      selectElement.value = '';

      return;
    }

    if (availableOptions.indexOf(selectElement.value) === -1) {
      selectElement.value = '';
    }
    options.forEach(function (option) {
      if (option.value && availableOptions.indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    });
  };

  // address
  var checkRequiredField = function (element, evt) {
    if (!element.value) {
      evt.preventDefault();
    }
  };

  window.utils.adForm.addEventListener('submit', function (evt) {
    checkRequiredField(window.form.inputAddress, evt);
  });
  window.form = {
    inputTypeHouse: window.utils.adForm.querySelector('#type'),
    inputPrice: window.utils.adForm.querySelector('#price'),
    inputAddress: window.utils.adForm.querySelector('#address')
  };
})();
