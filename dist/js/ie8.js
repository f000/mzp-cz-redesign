/*
* Part of MZP.CZ Redesign Project
* @author Lukas Vorlicek <lukas.vorlicek@codeart.cz>
* @copyright Copyright (c) 2014 Ministry of the Environment of the Czech Republic
* @licence CC BY-NC-ND 3.0 CZ
*/

// Ugly glyph-font render hack for IE8
$(document).ready(function() {
  var $style;
  $style = $('<style type="text/css">:before,:after{content:none !important}</style>');
  $('head').append($style);
  return setTimeout((function() {
    return $style.remove();
  }), 0);
});