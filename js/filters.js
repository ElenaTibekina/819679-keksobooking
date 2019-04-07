'use strict';
(function () {
  var filterFormElement = document.querySelector('.map__filters-container');
  var filterInputElements = filterFormElement.querySelectorAll('input');
  var filterSelectElements = filterFormElement.querySelectorAll('select');
  var filterTypeElement = filterFormElement.querySelector('#housing-type');
  var filterPriceElement = filterFormElement.querySelector('#housing-price');
  var filterRoomElement = filterFormElement.querySelector('#housing-rooms');
  var filterGuestsElement = filterFormElement.querySelector('#housing-guests');
  var filterFeaturesElement = filterFormElement.querySelector('#housing-features');

  var PRICE_RANGES = {
    low: 10000,
    high: 50000
  };

  var FILTERED_OFFERS_LENGTH = 5;

  /** Данные с сервера */
  var originalOffers;

  /** Отфильтрованные пользователем объявления */
  var filteredOffers;

  var onLoadOffers = function (data) {
    originalOffers = data;
    filteredOffers = trimOffers(data);

    window.pins.render(filteredOffers);
    window.pin.cityMapPin.addEventListener('click', onOfferPinClick);
  };

  var trimOffers = function (offers) {
    return offers.slice(0, FILTERED_OFFERS_LENGTH);
  };

  /**
  var filtrationOffers = function (offers) {
    var selectedTypeElement = filterTypeElement.options[filterTypeElement.selectedIndex];
    var selectedPriceElement = filterPriceElement.options[filterPriceElement.selectedIndex];
    var selectedRoomsElement = filterRoomElement.options[filterRoomElement.selectedIndex];
    var selectedGuestsElement = filterGuestsElement.options[filterGuestsElement.selectedIndex];
    var selectedFeaturesElements = filterFeaturesElement.querySelectorAll('input:checked');

    console.log(selectedTypeElement);
    console.log(selectedPriceElement);


    var filteredOffers = offers
        .filter(function (item) {
          return filterTypeElement.value === item.offer.type;
        })
        .filter(
          function (item) {
            console.log(item);
            return true;
            // return item.offer.price >= priceLimit.min
        });

      // .filter(selectedPriceElement)
      // .filter(selectedRoomsElement)
      // .filter(selectedGuestsElement)
      // .filter(selectedFeaturesElements);
      console.log(filteredOffers);

    return filteredOffers;
  };

  var onFiltersChanged = function () {
    filtrationOffers(window.array.ads || []);
  };


  filterFormElement.addEventListener('change', onFiltersChanged);
  */
  // window.filter = {
  //   activate: function () {
  //     Array.prototype.forEach.call(filterInputElements, function (element) {
  //       element.removeAttribute('disabled');
  //     });
  //     Array.prototype.forEach.call(filterSelectElements, function (element) {
  //       element.removeAttribute('disabled');
  //     });

  //     window.pin.removePins();

  //     filterFormElement.addEventListener('change', onFiltersChanged);
  //   },
  //   deactivate: function () {
  //     Array.prototype.forEach.call(filterInputElements, function (element) {
  //       element.setAttribute('disabled', '');
  //     });
  //     Array.prototype.forEach.call(filterSelectElements, function (element) {
  //       element.setAttribute('disabled', '');
  //     });

  //     filterFormElement.removeEventListener('change', onFiltersChanged);
  //   }
  // };
})();
