import $ from 'jquery';
export default afterClick;

function afterClick(){
  $('ul').empty();
  //REPOSITION/RESIZING HEADER AFTER SELECTION IS MADE
  $('header').addClass('header-after');
  $('.logo').addClass('logo-after');
  $('body').addClass('body-after');
  //ADD LOADING GIF WHEN SELECTION BAR IS CLICKED
  $('ul').append('<li class="loading"><img src="/public/images/ajax-loader.gif"></li>');
}