'use strict';

var map = document.querySelector('.map');
var template = document.querySelector('template');
var mapPin = document.querySelector('.map__pin');
var cityMapPin = document.querySelector('.map__pins');
var mapCard = template.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var fieldset = document.querySelectorAll('.fieldset');
var mainPin = document.querySelector('.map__pin--main');

var PIN_WIDTH = 46;
var PIN_HEIGHT = 64;
var ADS = [];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ADS_NUMBER = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS_NUMBER = 1;
var MAX_ROOMS_NUMBER = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 130;
var MAX_Y = 650;

// переключатель
var toggleForm = function () {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = !fieldset[i].disabled;
  }
};

// случайное значение в диапазоне
var getValueInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// случайное значение из массива
var getRandomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var composePinsData = function () {
  var ADS = [];
  for (var i = 0; i < ADS_NUMBER; i++) {
    var locationX = getValueInRange(MIN_X, MAX_X);
    var locationY = getValueInRange(MIN_Y, MAX_Y);
    var author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };
    var offer = {
      title: getRandomValue(TITLES),
      address: locationX + ', ' + locationY,
      price: getValueInRange(MIN_PRICE, MAX_PRICE),
      type: getRandomValue(TYPES),
      rooms: getValueInRange(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
      guests: getValueInRange(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomValue(CHECK_TIME),
      checkout: getRandomValue(CHECK_TIME),
      features: [],
      description: '',
      photos: [],
    };
    var location = {
      x: locationX,
      y: locationY
    };
    ADS.push({
      author: author,
      offer: offer,
      location: location
    });
  } return ADS[i];
};

ADS = composePinsData();

// render mapPin from template
var renderMapPin = function () {
  var pinElement = mapPin.cloneNode(true);
  pinElement.querySelector('img').src = ADS.author;
  pinElement.style.left = (ADS.locationX - PIN_WIDTH) + 'px';
  pinElement.style.top = (ADS.locationY - PIN_HEIGHT) + 'px';
  return pinElement;
};

// Rendering Card from template
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

  cardElement.querySelector('.popup__title').textContent = ADS.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ADS.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ADS.offer.price + '&#x20bd;/ночь';
  cardElement.querySelector('.popup__type').textContent = getHouseType(ADS.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = ADS.offer.rooms + ' комнаты для ' + ADS.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ADS.offer.checkin + ', выезд до ' + ADS.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = addFeatureItem(ADS.offer.features);
  cardElement.querySelectorAll('.popup__features > li').textContent = addItemClasses(ADS.offer.features);
  cardElement.querySelector('.popup__description').textContent = ADS.offer.description;
  cardElement.querySelector('.popup__avatar').src = ADS.author.avatar;
  cardElement.style.left = (ADS.locationX - PIN_WIDTH) + 'px';
  cardElement.style.top = (ADS.locationY - PIN_HEIGHT) + 'px';

  return cardElement;
};

mainPin.addEventListener('mouseup', function () {
  adForm.classList.remove('.ad-form--disabled');
  map.classList.remove('.map--faded');
  toggleForm();
  var fragmentPins = document.createDocumentFragment();
  var fragmentCards = document.createDocumentFragment();
  cityMapPin.appendChild(renderMapPin());
  cityMapPin.appendChild(fragmentPins);
  map.appendChild(fragmentCards);
});

/**
var fragmentPins = document.createDocumentFragment();
var fragmentCards = document.createDocumentFragment();
// useful functions

mainPin.addEventListener('mouseup', function () {
  adForm.classList.remove('.ad-form--disabled');
  map.classList.remove('.map--faded');
  toggleForm();
  cityMapPin.appendChild(renderMapPin());
  cityMapPin.appendChild(fragmentPins);
  map.appendChild(fragmentCards);
});

// render mapPin from template

var renderMapPin = function () {
  var pinElement = mapPin.cloneNode(true);
  pinElement.querySelector('img').src = author.avatar;
  pinElement.style.left = (location.x - PIN_WIDTH) + 'px';
  pinElement.style.top = (location.y - PIN_HEIGHT) + 'px';
  return pinElement;
};

// Rendering Card from template

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
  cardElement.style.left = (location.x - PIN_WIDTH) + 'px';
  cardElement.style.top = (location.y - PIN_HEIGHT) + 'px';

  return cardElement;
};

// Create fragments

// Create objects

for (var i = 0; i < ADS_NUMBER; i++) {
  var author = {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };
  var offer = {
    title: getRandomValue(TITLES),
    address: '{{location.x}}, {{location.y}}',
    price: getValueInRange(MIN_PRICE, maxPrice),
    type: getRandomValue(TYPES),
    rooms: getValueInRange(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
    guests: getValueInRange(MIN_GUESTS, MAX_GUESTS),
    checkin: getRandomValue(CHECK_TIME),
    checkout: getRandomValue(CHECK_TIME),
    features: [],
    description: '',
    photos: [],
  };

  var location = {
    x: getValueInRange(MIN_X, MAX_X),
    y: getValueInRange(MIN_Y, MAX_Y)
  };

  ADS[i] = {
    author: author,
    offer: offer,
    location: location
  };
  fragmentPins.appendChild(renderMapPin(ADS[i]));
}

fragmentCards.appendChild(renderCard(ADS[0]));
*/
