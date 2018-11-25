'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var minPrice = 1000;
var maxPrice = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var minRoomsNumber = 1;
var maxRoomsNumber = 5;
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//useful functions

var getValueInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomValue = function (array) {
  return array[Math.fllor(Math.random() * array.length)];
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var tokyoPinMap = document.querySelector('.map__pins');

var template = document.querySelector('template').content;
