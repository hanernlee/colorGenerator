// second solution without parseInt and toString methods
$( document ).ready(function() {
//Hex Code Library
  var hexLibrary = {
    "0" : 0,
    "1" : 1,
    "2" : 2,
    "3" : 3,
    "4" : 4,
    "5" : 5,
    "6" : 6,
    "7" : 7,
    "8" : 8,
    "9" : 9,
    "A" : 10,
    "B" : 11,
    "C" : 12,
    "D" : 13,
    "E" : 14,
    "F" : 15
  }

  //Normalize input by removing # and making them uppercase
  var normalize = function(hexColor) {
    var nomHex = hexColor.replace('#','').toUpperCase();
    return nomHex;
  };

  //Callback Function for .map to convert hex into decimal
  var hexToDec = function(hex) {
    var dec = hexLibrary[hex];
    return dec;
  };

  //Converts hex to RGB value through base 16 calculated from right to left
  //eg. FF = 255
  var hexToRGB = function(hex) {
    var sumRGB = 0;
    for (var i=hex.length-1; i >= 0; i--) {
      var adjToRGB = hex[i]*Math.pow(16,i);
      sumRGB = sumRGB + adjToRGB;
    }
    return sumRGB;
  };

  //Split Hex Array into 3 different portions for R,G,B
  // R is determined by the converted sum of values at index 0 and 1
  // G is determined by the converted sum of values at index 2 and 3
  // B is determined by the converted sum of values at index 4 and 5
  var splitHex = function(hexArray) {
    var R = hexToRGB(hexArray.slice(0,2));
    var G = hexToRGB(hexArray.slice(2,4));
    var B = hexToRGB(hexArray.slice(4,6));
    return { R, G ,B };
  }

  //Inverting key value pair of hexLibrary Object to for RGB conversion to Hex format
  var invertHexLibrary = function(library) {
    var reverseLibrary = {};
    for (var key in library) {
      reverseLibrary[library[key]] = key;
    }
    return reverseLibrary;
  }

  //Decoding RGB value to Hex format through invertedLibrary while value is > 0
  var decodeHex = function(rgbVal) {
    var revHexLibrary = invertHexLibrary(hexLibrary);
    var hexCode = '';
    while (rgbVal > 0) {
      hexCode = revHexLibrary[rgbVal%16] + hexCode;
      rgbVal = Math.floor(rgbVal/16);
    }
    return hexCode;
  }

  //Increment RGB value based on number of steps
  //adding padding of 0 to single digits to allow correct colours
  // 00 for empty strings
  var rgbToHex = function(startVal,diff,steps,index) {
    var rgbHex = startVal + (diff * (index/steps));
    var finalHex = decodeHex(Math.round(rgbHex));
    if (finalHex.length == 1) {
      finalHex = '0' + finalHex;
    } else if (finalHex === '') {
      finalHex= '00';
    }
    return finalHex;
  }

  $('#generateBtn').on('click', function() {
    $('.paletteContainer').empty();
    var firstColor = normalize($('#colorOne').val());
    var secondColor= normalize($('#colorTwo').val());
    var steps = parseInt($('#numSteps').val())-1;
    var finalHexColors = [];

    var firstHexArray = firstColor.split('');
    var secondHexArray = secondColor.split('');

    var firstRGB = firstHexArray.map(hexToDec);
    var secondRGB = secondHexArray.map(hexToDec);

    //difference between RGB of both colors
    var rDiff = splitHex(secondRGB).R - splitHex(firstRGB).R;
    var gDiff = splitHex(secondRGB).G - splitHex(firstRGB).G;
    var bDiff = splitHex(secondRGB).B - splitHex(firstRGB).B;

    //loop to generate each color palette and storing them in an array
    var generateSteps = function() {
      for (var i = 0; i <= steps; i ++) {
        var newR = rgbToHex(splitHex(firstRGB).R,rDiff,steps,i);
        var newG = rgbToHex(splitHex(firstRGB).G,gDiff,steps,i);
        var newB = rgbToHex(splitHex(firstRGB).B,bDiff,steps,i);
        var newHexColor = newR+''+newG+''+newB;
        finalHexColors.push(newHexColor);
      };
    };
    generateSteps();

    //looping through the array to generate DIV element with bgColor and append to HTML
    var generatePalette = function() {
      for (var i = 0; i < finalHexColors.length; i++) {
        var $paletteDiv = $('<div>').css({
          backgroundColor: "#"+finalHexColors[i],
        });

        $paletteDiv.addClass('paletteBox');
        $('.paletteContainer').append($paletteDiv);
      }
    };
    generatePalette();
  });

  //clear palette container and all input fields
  $('#clearBtn').on('click',function() {
    $('.paletteContainer').empty();
    $('input').each(function() {
      $(this).val('');
    });
  });
});
