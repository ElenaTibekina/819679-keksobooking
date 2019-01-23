'use strict';
(function () {
  // Rendering Card from template
  var renderCard = function (data) {
    var mapCard = document.querySelector('#card').content.querySelector('.map__card');

    // close active card
    var activeCard = document.querySelector('.popup');
    if (activeCard) {
      activeCard.remove();
    }

    window.utils.cardElement = mapCard.cloneNode(true);

    // close popup
    var closePopupButton = window.utils.cardElement.querySelector('.popup__close');
    closePopupButton.addEventListener('click', function () {
      window.utils.currentCard = null;
      window.utils.cardElement.remove();
    });

    // close popup ESC
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.card.ESC_KEYCODE) {
        window.utils.cardElement.remove();
      }
    });

    var getHouseType = function (value) {
      if (value === 'flat') {
        return 'Квартира';
      } else if (value === 'bungalo') {
        return 'Бунгало';
      } else if (value === 'house') {
        return 'Дом';
      } else if (value === 'palace') {
        return 'Дворец';
      }
      return value;
    };

    var addFeatureItem = function (array) {
      var FEATURES_LIST_ELEMENTS = [];
      for (var j = 0; j < array.length; j++) {
        FEATURES_LIST_ELEMENTS[j] = '<li></li>';
      }
      var featuresList = FEATURES_LIST_ELEMENTS.join(' ');
      return featuresList;
    };

    var addItemClasses = function (array) {
      var FEATURE_ITEMS = window.utils.cardElement.querySelectorAll('.popup__features > li');
      for (var i = 0; i < array.length; i++) {
        FEATURE_ITEMS[i].classList.add('feature');
        FEATURE_ITEMS[i].classList.add('feature--' + array[i]);
      }
      return FEATURE_ITEMS;
    };

    window.utils.cardElement.querySelector('.popup__title').textContent = data.offer.title;
    window.utils.cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    window.utils.cardElement.querySelector('.popup__text--price').innerHTML = data.offer.price + '&#x20bd;/ночь';
    window.utils.cardElement.querySelector('h4').textContent = getHouseType(data.offer.type);
    window.utils.cardElement.querySelector('h4 + p').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    window.utils.cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    window.utils.cardElement.querySelector('.popup__features').content = addFeatureItem(data.offer.features);
    window.utils.cardElement.querySelectorAll('.popup__features > li').content = addItemClasses(data.offer.features);
    window.utils.cardElement.querySelector('.popup__description').textContent = data.offer.description;
    window.utils.cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    return window.utils.cardElement;
  };

  window.card = {
    ESC_KEYCODE: 27,
    renderCard: renderCard
  };
})();
