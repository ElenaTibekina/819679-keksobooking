'use strict';
(function () {
  // Rendering Card from template
  var renderCard = function (adInfo) {
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

    window.utils.cardElement.querySelector('.popup__title').textContent = adInfo.offer.title;
    window.utils.cardElement.querySelector('.popup__text--address').textContent = adInfo.offer.address;
    window.utils.cardElement.querySelector('.popup__text--price').innerHTML = adInfo.offer.price + '&#x20bd;/ночь';
    window.utils.cardElement.querySelector('h4').textContent = getHouseType(adInfo.offer.type);
    window.utils.cardElement.querySelector('h4 + p').textContent = adInfo.offer.rooms + ' комнаты для ' + adInfo.offer.guests + ' гостей';
    window.utils.cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + adInfo.offer.checkin + ', выезд до ' + adInfo.offer.checkout;
    window.utils.cardElement.querySelector('.popup__features').content = addFeatureItem(adInfo.offer.features);
    window.utils.cardElement.querySelectorAll('.popup__features > li').content = addItemClasses(adInfo.offer.features);
    window.utils.cardElement.querySelector('.popup__description').content = adInfo.offer.description;
    window.utils.cardElement.querySelector('.popup__avatar').src = adInfo.author.avatar;
    window.utils.cardElement.querySelector('.popup__photo').src = adInfo.offer.photos;
    window.utils.cardElement.style.left = (adInfo.locationX - window.utils.PIN_WIDTH / 2) + 'px';
    window.utils.cardElement.style.top = (adInfo.locationY - window.utils.PIN_HEIGHT) + 'px';

    return window.utils.cardElement;
  };

  window.card = {
    ESC_KEYCODE: 27,
    renderCard: renderCard
  };
})();
