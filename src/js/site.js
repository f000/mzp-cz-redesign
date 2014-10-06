/*
* Part of MZP.CZ Redesign Project
* @author Lukas Vorlicek <lukas.vorlicek@codeart.cz>
* @copyright Copyright (c) 2014 Ministry of the Environment of the Czech Republic
* @licence CC BY-NC-ND 3.0 CZ
*/

/*global Modernizr:false, $:false, alert:false, grunticon:false*/

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
    loop:false,
    margin:10,
    nav:true,
    dots:false,
    navText: ['<span class="icon-lt2"></span>','<span class="icon-gt2"></span>'],
    responsive:{
      0:{
        items:3
      },
      600:{
        items:6
      },
      1000:{
        items:8
      }
    }
  });
}

function titleTooltip() {
  $('#bg-1 abbr[title!=""], #bg-3 [title!=""]').tooltip({
    placement: 'bottom',
    delay:1000
  });
  $('#bg-5 [title!=""]').tooltip({
    placement: 'top',
    delay:1000
  });
  $('#bg-4 a').tooltip({
    placement: 'bottom',
    delay:1000,
    title: function() {
      return $(this).children('abbr').attr('title');
    },
    viewport: '.owl-stage-outer'
  });
}

function colorboxLightbox() {
  $('a[rel^="lightbox"]').colorbox({
    rel:'gallery',
    opacity:0.7
  });  
}

function mainMenu() {
  //deactivate main links on 1st level
  $('#main-nav > ul > li > a').not('#main-nav > ul > li:first-child a').click(function(e) {
    e.preventDefault(); 
  });
  
  // fade out inactive
  $('#main-nav div').mouseleave(function() {
    $(this).delay(1000).fadeOut();
  });

  //2nd level  
  $('#main-nav > ul > li').click(function() {
    $('#main-nav > ul > li').not($(this)).find('div').hide();
    $(this).children('div').toggle();
    /* 
    //same height box style
    var maxHeight = Math.max.apply(null, $(this).find('ul').map(function (){
        return $(this).height();
    }).get());
    $(this).children('div').height(maxHeight);
    $(this).find('ul ul').height(maxHeight);
    */
    var basicHeight = $(this).children('div').height();
    $(this).find('ul ul').each(function() { 
      if( $(this).height() < basicHeight ){
         $(this).height(basicHeight + 1);
      }     
    });
  });
  
  //3rd level
  $('#main-nav ul ul li').hover(function() {
    $(this).children('ul').toggle();
  });

}

function contactTelCollapsing() {
	var $main_list = $('.contactTel');
	var $triggers = $main_list.children('li:has(ul)').children('a');

	$triggers.siblings('ul').hide();
	$triggers.click(function() {
		var $node = $(this).parent();
		$node.siblings('li.act').andSelf().toggleClass('act').children('ul').toggle();
		return false;
	});
}

// Init
function initMZP() {
  shuffleTagCloud('.tag-cloud');
  scrollToTop('#gotop a');
  printPage('#print a');
  owlCarousel('.owl-carousel');
  titleTooltip();
  colorboxLightbox();
  contactTelCollapsing();
  mainMenu();
  grunticon(['css/organizations/icons.data.svg.css', 'css/organizations/icons.data.png.css', 'css/organizations/icons.fallback.css']);
}

$(document).ready(initMZP);

$(window).resize(function() {
  $('.carousel').trigger('refresh.owl.carousel');
});