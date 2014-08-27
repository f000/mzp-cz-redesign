/*
* Part of MZP.CZ Redesign Project
* @author Lukas Vorlicek <lukas.vorlicek@codeart.cz>
* @copyright Copyright (c) 2014 Ministry of the Environment of the Czech Republic
* @licence CC BY-NC-ND 3.0 CZ
*/

/*global Modernizr:false, $:false*/

// SVG Fallback
if(!Modernizr.svgasimg) {
  $('img[src*="svg"]').attr('src', function() {
    return $(this).attr('src').replace('.svg', '.png');
  });
}

// Go to top Link
function scrollToTop(sel) {
  $(sel).click(function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return false;
  });
}

// Shuffle Tag Cloud
// TODO: remove for production
function shuffleTagCloud(sel) {
  var cloud = $(sel),
  tags = cloud.children();
  while (tags.length) {
    cloud.append(tags.splice(Math.floor(Math.random() * tags.length), 1)[0]);
  }
}

// Print page using print css
function printPage(sel) {
  $(sel).click(function() {
    window.print();
  });
}

// Owl carousel
function owlCarousel(sel) {
  $(sel).owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    dots:false,
    navText: ['<span class="icon-lt2"></span>','<span class="icon-gt2"></span>'],
    responsive:{
      0:{
        items:1
      },
      600:{
        items:4
      },
      1000:{
        items:6
      }
    }
  });
}

function initMZP() {
  shuffleTagCloud('.tag-cloud');
  scrollToTop('#gotop a');
  printPage('#print a');
  owlCarousel('.owl-carousel');

  //TODO: qTip2 for submenu
  //TODO: qTip2 for banner figcaption
  //TODO: qTip2 title, abbr

}

$(document).ready(initMZP);

$(window).resize(function() {
  $('.carousel').trigger('refresh.owl.carousel');
});
