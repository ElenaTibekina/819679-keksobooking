'use strict';

var ADS = [];
var adsNumber = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var minPrice = 1000;
var maxPrice = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var minRoomsNumber = 1;
var maxRoomsNumber = 5;
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var minGuests = 1;
var maxGuests = 10;
var minX = 300;
var maxX = 900;
var minY = 130;
var maxY = 650;

// useful functions

// переключатель

var adForm = document.querySelector('.ad__form');
var fieldset = document.querySelectorAll('.fieldset');
var mainPin = document.querySelector('.map__pin--main');

function toggleForm() {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = !fieldset[i].disabled;
  }
}

mainPin.addEventListener('mouseup', function () {
  adForm.classList.remove('.ad__form--disabled');
  map.classList.remove('.map--faded');
  toggleForm();
  cityMapPin.appendChild(renderMapPin());
});

// случайное значение в диапазоне
var getValueInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// случайное значение из массива
var getRandomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// убирает класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var cityMapPin = document.querySelector('.map__pins');
var template = document.querySelector('template').content;

// render mapPin from template
var mapPin = document.querySelector('.map__pin');
var pinWidth = 46;
var pinHeight = 64;

var renderMapPin = function () {
  var pinElement = mapPin.cloneNode(true);
  pinElement.querySelector('img').src = author.avatar;
  pinElement.style.left = (apartmentLocation.x - pinWidth) + 'px';
  pinElement.style.top = (apartmentLocation.y - pinHeight) + 'px';
  return pinElement;
};

// Rendering Card from template

var mapCard = template.querySelector('.map__card');

var renderCard = function () {
  var cardElement = mapCard.cloneNode(true);

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
    var FEATURE_ITEMS = cardElement.querySelectorAll('.popup__features > li');
    for (var i = 0; i < array.length; i++) {
      FEATURE_ITEMS[i].classList.add('feature');
      FEATURE_ITEMS[i].classList.add('feature--' + array[i]);
    }
    return FEATURE_ITEMS;
  };

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + '&#x20bd;/ночь';
  cardElement.querySelector('.popup__type').textContent = getHouseType(offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = addFeatureItem(offer.features);
  cardElement.querySelectorAll('.popup__features > li').textContent = addItemClasses(offer.features);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.style.left = (apartmentLocation.x - pinWidth) + 'px';
  cardElement.style.top = (apartmentLocation.y - pinHeight) + 'px';

  return cardElement;
};

// Create fragments
var fragmentPins = document.createDocumentFragment();
var fragmentCards = document.createDocumentFragment();

// Create objects

for (var i = 0; i < adsNumber; i++) {
  var author = {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };
  var offer = {
    title: getRandomValue(TITLES),
    address: '{{location.x}}, {{location.y}}',
    price: getValueInRange(minPrice, maxPrice),
    type: getRandomValue(TYPES),
    rooms: getValueInRange(minRoomsNumber, maxRoomsNumber),
    guests: getValueInRange(minGuests, maxGuests),
    checkin: getRandomValue(CHECK_TIME),
    checkout: getRandomValue(CHECK_TIME),
    features: [],
    description: '',
    photos: [],
  };

  var apartmentLocation = {
    x: getValueInRange(minX, maxX),
    y: getValueInRange(minY, maxY)
  };

  ADS[i] = {
    author: author,
    offer: offer,
    apartmentLocation: apartmentLocation
  };
  fragmentPins.appendChild(renderMapPin(ADS[i]));
}

fragmentCards.appendChild(renderCard(ADS[0]));

cityMapPin.appendChild(fragmentPins);
map.appendChild(fragmentCards);
