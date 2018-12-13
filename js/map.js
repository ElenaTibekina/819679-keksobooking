'use strict';

var map = document.querySelector('.map');
var template = document.querySelector('template');
var mapPin = document.querySelector('.map__pin');
var cityMapPin = document.querySelector('.map__pins');
var mapCard = document.querySelector('#card').content.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var fieldset = document.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WIDTH = 46;
var PIN_HEIGHT = 64;
var ADS = [];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
  for (var i = 0; i < ADS.length; i++) {
    fieldset[i].disabled = !fieldset[i].disabled;
    renderMapPin(ADS[i]);
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
  } return ADS;
};

ADS = composePinsData();

// render mapPin from template
var renderMapPin = function (adInfo) {
  var pinElement = pin.cloneNode(true);
  pinElement.querySelector('img').src = adInfo.author.avatar;
  pinElement.style.left = (adInfo.location.x - PIN_WIDTH) + 'px';
  pinElement.style.top = (adInfo.location.y - PIN_HEIGHT) + 'px';
  pinElement.addEventListener('click', function (evt) {
    fragmentCards.appendChild(renderCard(adInfo));
    map.appendChild(fragmentCards);
    cityMapPin.appendChild(fragmentPins);
  });
  return pinElement;
};

// Rendering Card from template
var renderCard = function (adInfo) {
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

  cardElement.querySelector('.popup__title').textContent = adInfo.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = adInfo.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = adInfo.offer.price + '&#x20bd;/ночь';
  cardElement.querySelector('h4').textContent = getHouseType(adInfo.offer.type);
  cardElement.querySelector('h4 + p').textContent = adInfo.offer.rooms + ' комнаты для ' + adInfo.offer.guests + ' гостей';
  cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + adInfo.offer.checkin + ', выезд до ' + adInfo.offer.checkout;
  cardElement.querySelector('.popup__features').content = addFeatureItem(adInfo.offer.features);
  cardElement.querySelectorAll('.popup__features > li').content = addItemClasses(adInfo.offer.features);
  cardElement.querySelector('.popup__description').content = adInfo.offer.description;
  cardElement.querySelector('.popup__avatar').src = adInfo.author.avatar;
  cardElement.querySelector('.popup__photo').src = adInfo.offer.photos;
  cardElement.style.left = (adInfo.locationX - PIN_WIDTH) + 'px';
  cardElement.style.top = (adInfo.locationY - PIN_HEIGHT) + 'px';

  return cardElement;
};

mainPin.addEventListener('mouseup', function () {
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  toggleForm();
  for (var i = 0; i < ADS.length; i++) {
    map.appendChild(renderMapPin(ADS[i]));
  }
});

// create fragments
var fragmentPins = document.createDocumentFragment();
var fragmentCards = document.createDocumentFragment();
