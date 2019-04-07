'use strict';
(function () {
  // render mapPin from template
  var cityMapPin = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var renderMapPin = function (offer) {
    var pinElement = pin.cloneNode(true);
    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.style.left = (offer.location.x - window.utils.PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (offer.location.y - window.utils.PIN_HEIGHT) + 'px';
    pinElement.addEventListener('click', function () {
      window.map.fragmentCards.appendChild(window.card.renderCard(offer));
      window.utils.currentCard = window.utils.cardElement;
      window.utils.map.appendChild(window.map.fragmentCards);
      cityMapPin.appendChild(window.map.fragmentPins);
    });
    return pinElement;
  };

  window.pin = {
    renderMapPin: renderMapPin
  };

})();
