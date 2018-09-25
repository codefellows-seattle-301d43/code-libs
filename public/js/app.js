'use strict';

$('.drop-down').on('mouseenter', () => {
  $('.play-drop-down').slideDown(200);
})

$('.play-drop-down').on('mouseleave', function () {
  $(this).slideUp(200);
});

$('#mobile-play').on('click', function () {
  $('.play-drop-down').slideToggle();
});

$('.hamburger').on('click', () => {
  $('.main-menu').show('slide', {direction: 'right'}, 250);
});

$('.close-menu-arrow').on('click', () => {
  $('.main-menu').hide('slide', {direction: 'right'}, 250);
});

$(window).resize(function() {
  if ($(window).width() > 800) {
    $('.main-menu').removeAttr('style');
  }
});
