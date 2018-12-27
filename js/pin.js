'use strict';
(function () {
  // render mapPin from template
  var renderMapPin = function (adInfo) {
    var cityMapPin = document.querySelector('.map__pins');
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pin.cloneNode(true);
    pinElement.querySelector('img').src = adInfo.author.avatar;
    pinElement.style.left = (adInfo.location.x - window.utils.PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (adInfo.location.y - window.utils.PIN_HEIGHT) + 'px';
    pinElement.addEventListener('click', function () {
      window.map.fragmentCards.appendChild(window.card.renderCard(adInfo));
      window.utils.currentCard = window.utils.cardElement;
      window.utils.map.appendChild(window.map.fragmentCards);
      cityMapPin.appendChild(window.map.fragmentPins);
    });
    return pinElement;
  };

  window.pin = {
    renderMapPin: renderMapPin
  };
  window.pin.renderMapPin();
})();
