'use strict';
(function () {
  var composePinsData = function () {
    var MIN_X = 300;
    var MAX_X = 900;
    var MIN_Y = 130;
    var MAX_Y = 650;
    var MIN_PRICE = 1000;
    var MAX_PRICE = 1000000;
    var MIN_ROOMS_NUMBER = 1;
    var MAX_ROOMS_NUMBER = 5;
    var MIN_GUESTS = 1;
    var MAX_GUESTS = 10;
    var ADS = [];
    var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var TYPES = ['palace', 'flat', 'house', 'bungalo'];
    var CHECK_TIME = ['12:00', '13:00', '14:00'];
    var ADS_NUMBER = 8;

    for (var i = 0; i < ADS_NUMBER; i++) {
      var locationX = window.utils.getValueInRange(MIN_X, MAX_X);
      var locationY = window.utils.getValueInRange(MIN_Y, MAX_Y);
      var author = {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      };
      var offer = {
        title: window.utils.getRandomValue(TITLES),
        address: locationX + ', ' + locationY,
        price: window.utils.getValueInRange(MIN_PRICE, MAX_PRICE),
        type: window.utils.getRandomValue(TYPES),
        rooms: window.utils.getValueInRange(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
        guests: window.utils.getValueInRange(MIN_GUESTS, MAX_GUESTS),
        checkin: window.utils.getRandomValue(CHECK_TIME),
        checkout: window.utils.getRandomValue(CHECK_TIME),
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

  window.data = {
    adInfo: composePinsData,
    composePinsData: composePinsData,
    ads: []
  };

  window.data.ads = composePinsData();
})();
