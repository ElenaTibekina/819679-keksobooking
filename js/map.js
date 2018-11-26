'use strict';

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

//useful functions

//случайное значение в диапазоне
var getValueInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

//случайное значение из массива
var getRandomValue = function (array) {
  return array[Math.fllor(Math.random() * array.length)];
};

//перемешивает значения в массиве
var shuffleRandomArray = function (array) {
  return Math.floor(Math.random() * array.length)
}

//случайная длина массива FEATURES
var randomFeatureLength = Math.round(Math.random() * FEATURES.length);

//убирает класс .map--faded
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
  location: getValueInRange(minX, maxX), getValueInRange(minY, maxY)
};

