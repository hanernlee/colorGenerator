//better and refactorised solution
$( document ).ready(function() {

  //converts Hex Code to RGB Color in an Array
  var hexToRGB = function(hexCode) {
    var hexColor = hexCode.replace('#','');
    //a better approach using .map returns array of 3 RGB values
    return [0,2,4].map(function(n,i) {
      return parseInt(hexColor.slice(n,n+2),16);
    });
  };

  //converts RGB back to Hex Code
  var rgbToHex = function(startVal,diff,steps,index) {
    var hexCode = startVal + (diff * (index/steps));
    var finalHexColor = Math.round(hexCode).toString(16);
    //if it is a single hex code, add padding of '0' to it so colors will generate correctly
    if (finalHexColor.length === 1) {
      finalHexColor = '0' + finalHexColor;
    }
    return finalHexColor;
  };

  //loop through to generate each color pallete and storing in an array
  var generateSteps = function(firstRGB,diffs,steps) {
    var hexColorArray = [];
    //cStr is the previous value
    for (var j = 0; j <= steps; j ++) {
      hexColorArray.push(
        firstRGB.reduce(function(cStr,val,i) {
          return cStr + rgbToHex(val, diffs[i], steps, j);
        }, ''));
    };
    return hexColorArray;
  };

  //looping through the array to generate DIV element with bgColor and append to HTML
  var generatePalette = function(hexColorArray) {
    for (var i = 0; i < hexColorArray.length; i++) {
      var $paletteDiv = $('<div>').css({
        backgroundColor: '#'+hexColorArray[i],
      });

      $paletteDiv.addClass('paletteBox');
      $('.paletteContainer').append($paletteDiv);
    }
  };

  $('#generateBtn').on('click', function() {
    $('.paletteContainer').empty();
    var firstRGB = hexToRGB($('#colorOne').val());
    var secondRGB = hexToRGB($('#colorTwo').val());
    //reducing steps by 1 to exclude the first step
    var steps = parseInt($('#numSteps').val())-1;

    //returns difference between RGB of both color values in an array
    var diffs = secondRGB.map(function(cValue,i) {
      return cValue - firstRGB[i]
    });

    generatePalette(
      generateSteps(firstRGB, diffs, steps)
    );
  });

  //clear palette container and all input fields
  $('#clearBtn').on('click',function() {
    $('.paletteContainer').empty();
    $('input').each(function() {
      $(this).val('');
    });
  });
});
