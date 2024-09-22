$(document).ready(function(){
 $('.header_burger').click(function(event){
     $('.header_burger, .header-nav').toggleClass('active');
     $('body').toggleClass('lock');
 });
 $('.header-list').click(function(event) {
    $('.header_burger,.header-nav').removeClass('active');
    $('body').removeClass('lock');
});
});