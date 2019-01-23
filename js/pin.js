'use strict';
(function () {
  // render mapPin from template
  var renderMapPin = function (data) {
    var cityMapPin = document.querySelector('.map__pins');
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pin.cloneNode(true);
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.style.left = (data.location.x - window.utils.PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (data.location.y - window.utils.PIN_HEIGHT) + 'px';
    pinElement.addEventListener('click', function () {
      window.map.fragmentCards.appendChild(window.card.renderCard(data));
      window.utils.currentCard = window.utils.cardElement;
      window.utils.map.appendChild(window.map.fragmentCards);
      cityMapPin.appendChild(window.map.fragmentPins);
    });
    return pinElement;
  };

  // var pinElements = [];
  // var generatePins = function (data) {}

  window.pin = {
    renderMapPin: renderMapPin
  };

})();
