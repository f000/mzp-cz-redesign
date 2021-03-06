/*
* Part of MZP.CZ Redesign Project
* @author Lukas Vorlicek <lukas.vorlicek@codeart.cz>
* @copyright Copyright (c) 2014 Ministry of the Environment of the Czech Republic
* @licence CC BY-NC-ND 3.0 CZ
*/
/*jslint browser: true, sloppy: true, todo: true */
/*global Modernizr:false, $:false, alert:false, grunticon:false, console*/

// SVG Fallback
if (!Modernizr.svgasimg) {
    $('img[src*="svg"]').attr('src', function () {
        return $(this).attr('src').replace('.svg', '.png');
    });
}

// Go to top Link
function scrollToTop(sel) {
    $(sel).click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });
}

// Shuffle Tag Cloud
function shuffleTagCloud(sel) {
    var cloud = $(sel),
        tags = cloud.children(),
        semirandom = [2, 0, 9, 1, 10, 4, 12, 7, 15, 6, 13, 8, 11, 3, 14, 5];
    $.each(semirandom, function (i, n) {
        cloud.append(tags.splice(n, 1)[0]);
    });
}

// Print page using print css
function printPage(sel) {
    $(sel).click(function () {
        window.print();
    });
}

// Owl carousel
function owlCarousel(sel) {
    $(sel).owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        dots: false,
        navText: ['<span class="icon-lt2"></span>', '<span class="icon-gt2"></span>'],
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 6
            },
            1000: {
                items: 8
            }
        }
    });
}

function titleTooltip() {
    $('#bg-1 abbr[title!=""], #bg-3 [title!=""]').tooltip({
        placement: 'bottom',
        delay: 1000
    });
    $('#bg-5 [title!=""]').tooltip({
        placement: 'top',
        delay: 1000
    });
    $('#bg-4 a').tooltip({
        placement: 'bottom',
        delay: 1000,
        title: function () {
            return $(this).children('abbr').attr('title');
        },
        viewport: '.owl-stage-outer'
    });
}

function colorboxLightbox() {
    $('a[rel^="lightbox"]').colorbox({
        rel: 'gallery',
        opacity: 0.7,
        speed: 250,
        title: function () {
            if ($(this).siblings('figcaption').text()) {
                return $(this).siblings('figcaption').text();
            }
            if ($(this).attr('title')) {
                return $(this).attr('title');
            }
            if ($(this).children('img').attr('title')) {
                return $(this).children('img').attr('title');
            }
            if ($(this).children('img').attr('alt')) {
                return $(this).children('img').attr('alt');
            }
            return false;
        },
        maxWidth: '90%',
        maxHeight: '90%',
        initialWidth: 800,
        initialHeight: 600,
        current: '{current} / {total}',
        previous: '«',
        next: '»',
        close: '\u00D7'
    });
}

function mainMenu() {
    $('#main-nav > ul > li > a').not('#main-nav > ul > li:first-child a').not('#main-nav > ul > li:last-child a').addClass('disabled');
    $('#main-nav > ul').smartmenus({
        mainMenuSubOffsetY: 10,
        subMenusSubOffsetY: -9,
        subMenusMinWidth: 0,
        subMenusMaxWidth: 200
    });
}

function contactTelCollapsing() {
    var $main_list = $('.contactTel'),
        $triggers = $main_list.children('li:has(ul)').children('a');

    $triggers.siblings('ul').hide();
    $triggers.click(function () {
        var $node = $(this).parent();
        $node.siblings('li.act').andSelf().toggleClass('act').children('ul').toggle();
        return false;
    });
}

// Resize iframe
function pollResize(height) {
    $('#mzp-poll').height(0);
    $('#mzp-poll').height(height);
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

    $('#mzp-poll').on("load", function () {
        
    });
}

$(document).ready(initMZP);

$(window).resize(function () {
    $('.carousel').trigger('refresh.owl.carousel');
});