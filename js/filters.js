'use strict';
(function () {
  var filterFormElement = document.querySelector('.map__filters');
  var formInputElements = filterFormElement.querySelectorAll('input[type="checkbox"]');
  var formSelectElements = filterFormElement.querySelectorAll('select');

  var byPrice = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var enableElements = function (elements) {
    Array.prototype.forEach.call(elements, function (element) {
      element.removeAttribute('disabled');
    });
  };

  var filterPriceElement = filterFormElement.querySelector('#housing-price');
  var FILTER_FIELD_DEFAULT_VALUE = 'any';

  var filterByPrice = function (data) {
    var priceLimit = byPrice[filterPriceElement.value];
    return filterPriceElement.value === FILTER_FIELD_DEFAULT_VALUE || data.offer.price >= priceLimit.min && data.offer.price <= priceLimit.max;
  };

  var filterBySelect = function (filterElement, data, fieldName) {
    return filterElement.value === FILTER_FIELD_DEFAULT_VALUE || filterElement.value === data.offer[fieldName].toString();
  };

  var filterByFeatures = function (data) {
    var checkboxFeaturesElements = Array.from(filterFormElement.querySelectorAll('input[type="checkbox"]'));
    var features = Array
      .from(checkboxFeaturesElements)
      .filter(function (checkedFeature) {
        return checkedFeature.checked;
      })
      .every(function (feature) {
        return data.offer.features.indexOf(feature.value) !== -1;
      });
    return features;
  };

  var filterTypeElement = filterFormElement.querySelector('#housing-type');
  var filterRoomElement = filterFormElement.querySelector('#housing-rooms');
  var filterGuestsElement = filterFormElement.querySelector('#housing-guests');
  var filter = function (offers) {
    return offers.filter(function (data) {
      return filterBySelect(filterTypeElement, data, 'type') &&
        filterBySelect(filterRoomElement, data, 'rooms') &&
        filterBySelect(filterGuestsElement, data, 'guests') &&
        filterByPrice(data) &&
        filterByFeatures(data);
    });
  };

  var DEBOUNCE_TIME = 500;
  var createFilterFormHandler = function (onFilter, offers) {
    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        onFilter(filter(offers));
      }, DEBOUNCE_TIME);
    };
  };

  var lastTimeout;
  var onFilterFormChange;

  window.filter = {
    activate: function (offers, onFilter) {
      enableElements(formInputElements);
      enableElements(formSelectElements);

      onFilterFormChange = createFilterFormHandler(onFilter, offers);

      filterFormElement.addEventListener('change', onFilterFormChange);
    },
    deactivate: function () {
      enableElements(formInputElements);
      enableElements(formSelectElements);

      filterFormElement.removeEventListener('change', onFilterFormChange);
    }
  };
})();
