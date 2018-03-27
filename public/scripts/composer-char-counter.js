const limit = 140;

$(document).ready(function () {
$('.new-tweet textarea').keyup(function (){
    let length = $(this).val().length;
    let counter = $(this).siblings('.counter');
    counter.text(limit - length);
    if (length > limit) {
      counter.addClass('warning');
    }
  });
});

