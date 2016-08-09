$( document ).ready(function() {

  var hexToRGB = function(hexCode) {
    var hexColor = hexCode.replace('#','');
    var R = parseInt(hexColor.slice(0,2),16);
    var G = parseInt(hexColor.slice(2,4),16);
    var B = parseInt(hexColor.slice(4,6),16);
    return {R, G, B};
  }

  var rgbToHex = function(startVal,diff,steps,index) {
    var hexCode = startVal + (diff * (index/steps));
    var finalHexColor = Math.round(hexCode).toString(16);
    if (finalHexColor.length === 1) {
      finalHexColor = '0' + finalHexColor;
    }
    return finalHexColor;
  }

  $('#generateBtn').on('click', function() {
    $('.paletteContainer').empty();
    var firstColor = $('#colorOne').val();
    var secondColor= $('#colorTwo').val();
    var steps = parseInt($('#numSteps').val())-1;
    var hexColorArray = [];

    var firstRGB = hexToRGB(firstColor);
    var secondRGB = hexToRGB(secondColor);

    var rDiff = secondRGB.R - firstRGB.R;
    var gDiff = secondRGB.G - firstRGB.G;
    var bDiff = secondRGB.B - firstRGB.B;

    var generateSteps = function() {
      var newHexColor = {};
      for (var i = 0; i <= steps; i ++) {
        var newR = rgbToHex(firstRGB.R,rDiff,steps,i);
        var newG = rgbToHex(firstRGB.G,gDiff,steps,i);
        var newB = rgbToHex(firstRGB.B,bDiff,steps,i);
        newHexColor = newR+''+newG+''+newB;
        hexColorArray.push(newHexColor);
      };
    }
    generateSteps();

    var generatePalette = function() {
      for (var i = 0; i < hexColorArray.length; i++) {
        var $paletteDiv = $('<div>').css({
          backgroundColor: "#"+hexColorArray[i],
        });

        $paletteDiv.addClass('paletteBox');
        $('.paletteContainer').append($paletteDiv);
      }
    }
    generatePalette();
  });

  $('#clearBtn').on('click',function() {
    $('.paletteContainer').empty();
  });
});
