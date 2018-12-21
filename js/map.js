'use strict';

var map = document.querySelector('.map');
var cityMapPin = document.querySelector('.map__pins');
var mapCard = document.querySelector('#card').content.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var fieldsets = document.querySelectorAll('fieldset');
var inputAddress = adForm.querySelector('#address');
var mainPin = document.querySelector('.map__pin--main');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WIDTH = 46;
var PIN_HEIGHT = 64;

var ads = [];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
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
var ESC_KEYCODE = 27;
var cardElement = currentCard;
var currentCard;

// переключатель
var toggleForm = function () {
  for (var i; i < fieldsets.length; i++) {
    if (fieldsets.disabled) {
      adForm.classList.remove('disabled');
    } else {
      adForm.classList.add('disabled');
    }
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

ads = composePinsData();

// render mapPin from template
var renderMapPin = function (adInfo) {
  var pinElement = pin.cloneNode(true);
  pinElement.querySelector('img').src = adInfo.author.avatar;
  pinElement.style.left = (adInfo.location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (adInfo.location.y - PIN_HEIGHT) + 'px';
  pinElement.addEventListener('click', function () {
    fragmentCards.appendChild(renderCard(adInfo));
    currentCard = cardElement;
    map.appendChild(fragmentCards);
    cityMapPin.appendChild(fragmentPins);
  });
  return pinElement;
};

// Rendering Card from template
var renderCard = function (adInfo) {

  // close active card
  var activeCard = document.querySelector('.popup');
  if (activeCard) {
    activeCard.remove();
  }

  cardElement = mapCard.cloneNode(true);

  // close popup
  var closePopupButton = cardElement.querySelector('.popup__close');
  closePopupButton.addEventListener('click', function () {
    currentCard = null;
    cardElement.remove();
  });

  // close popup ESC
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      cardElement.remove();
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
  cardElement.style.left = (adInfo.locationX - PIN_WIDTH / 2) + 'px';
  cardElement.style.top = (adInfo.locationY - PIN_HEIGHT) + 'px';

  return cardElement;
};

// mouseup active state
var MAP_WIDTH = 1200;
var MAP_HEIGHT = 630;
var MIN_ACTIVE_MAP_X = 0;
var MIN_ACTIVE_MAP_Y = 130;

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var dragged = false;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var mainPinTop = mainPin.offsetTop - shift.y;
    var mainPinLeft = mainPin.offsetLeft - shift.x;

    var checkMapCoords = function () {
      if (mainPinTop < MIN_ACTIVE_MAP_Y || mainPinTop > MAP_HEIGHT) {
        moveEvt.preventDefault();
      } if (mainPinLeft < MIN_ACTIVE_MAP_X || mainPinLeft > MAP_WIDTH) {
        moveEvt.preventDefault();
      }
    };

    mainPin.style.top = mainPinTop + 'px';
    mainPin.style.left = mainPinLeft + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    toggleForm();
    for (var i = 0; i < ads.length; i++) {
      map.appendChild(renderMapPin(ads[i]));
    }

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        mainPin.removeEventListener('click', onClickPreventDefault);
      };
      mainPin.addEventListener('click', onClickPreventDefault);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    inputAddress.value = parseFloat(mainPin.style.left + PIN_WIDTH / 2) + ', ' + parseFloat(mainPin.style.top + PIN_HEIGHT);
  };
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('mousemove', onMouseMove);
});

// address
var checkRequiredField = function (element, evt) {
  if (!element.value) {
    evt.preventDefault();
  }
};

adForm.addEventListener('submit', function (evt) {
  checkRequiredField(inputAddress, evt);
});

// create fragments
var fragmentPins = document.createDocumentFragment();
var fragmentCards = document.createDocumentFragment();

// synch #type and #price
var inputTypeHouse = adForm.querySelector('#type');
var inputPrice = adForm.querySelector('#price');

var synchTypeAndPrice = function () {
  if (inputTypeHouse.value === 'bungalo') {
    inputPrice.placeholder = '0';
  } else if (inputTypeHouse.value === 'flat') {
    inputPrice.placeholder = '1000';
  } else if (inputTypeHouse.value === 'house') {
    inputPrice.placeholder = '5000';
  } else if (inputTypeHouse.value === 'palace') {
    inputPrice.placeholder = '10000';
  }
};

var minPriceAndTypeDependence = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};

var synchTypeAndMinPrice = function () {
  inputPrice.min = minPriceAndTypeDependence[inputTypeHouse.value];
};

inputTypeHouse.addEventListener('change', synchTypeAndMinPrice);
inputTypeHouse.addEventListener('change', synchTypeAndPrice);

// synch checktime
var selectCheckIn = adForm.querySelector('#timein');
var selectCheckOut = adForm.querySelector('#timeout');

var synchCheckTime = function (selectIn, selectOut) {
  if (selectIn.value === '12:00') {
    selectOut.value = '12:00';
  } else if (selectIn.value === '13:00') {
    selectOut.value = '13:00';
  } else if (selectIn.value === '14:00') {
    selectOut.value = '14:00';
  }
};

selectCheckIn.addEventListener('change', function () {
  synchCheckTime(selectCheckIn, selectCheckOut);
});

selectCheckOut.addEventListener('change', function () {
  synchCheckTime(selectCheckOut, selectCheckIn);
});

// synch rooms and guests
var inputRoomNumber = adForm.querySelector('#room_number');
var inputCapacity = adForm.querySelector('#capacity');

var roomDependence = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['2', '3'],
  '100': ['0']
};

inputRoomNumber.addEventListener('change', function (event) {
  var value = event.target.value;
  var availableOptions = roomDependence[value];
  lockUnavailableOptions(inputCapacity, availableOptions, value);
});

var lockUnavailableOptions = function (selectElement, availableOptions, value) {
  var options = selectElement.childNodes;
  if (!value) {
    options.forEach(function (option) {
      option.disabled = false;
    });
    selectElement.value = '';

    return;
  }

  if (availableOptions.indexOf(selectElement.value) === -1) {
    selectElement.value = '';
  }
  options.forEach(function (option) {
    if (option.value && availableOptions.indexOf(option.value) === -1) {
      option.disabled = true;
    } else {
      option.disabled = false;
    }
  });
};
