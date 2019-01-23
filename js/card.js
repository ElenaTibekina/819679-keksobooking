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

    var createCardFeaturesFragment = function (features) {
      var fragment = document.createDocumentFragment();

      features.forEach(function (feature) {
        var element = document.createElement('li');
        element.className = 'popup__feature popup__feature--' + feature;
        fragment.appendChild(element);
      });

      return fragment;
    };

    var createCardPhotosFragment = function (photos) {
      var fragment = document.createDocumentFragment();

      photos.forEach(function (photo) {
        var element = document.createElement('img');

        element.className = 'popup__photo';
        element.src = photo;
        element.width = 45;
        element.height = 40;

        fragment.appendChild(element);
      });

      return fragment;
    };

    window.utils.cardElement.querySelector('.popup__title').textContent = data.offer.title;
    window.utils.cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    window.utils.cardElement.querySelector('.popup__text--price').innerHTML = data.offer.price + '&#x20bd;/ночь';
    window.utils.cardElement.querySelector('h4').textContent = getHouseType(data.offer.type);
    window.utils.cardElement.querySelector('h4 + p').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    window.utils.cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    window.utils.cardElement.querySelector('.popup__description').textContent = data.offer.description;
    window.utils.cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    var cardFeaturesElement = window.utils.cardElement.querySelector('.popup__features');
    cardFeaturesElement.innerHTML = '';
    cardFeaturesElement.appendChild(createCardFeaturesFragment(data.offer.features));

    var cardPhotosElement = window.utils.cardElement.querySelector('.popup__photos');
    cardPhotosElement.innerHTML = '';
    cardPhotosElement.appendChild(createCardPhotosFragment(data.offer.photos));

    return window.utils.cardElement;
  };

  window.card = {
    ESC_KEYCODE: 27,
    renderCard: renderCard
  };
})();
