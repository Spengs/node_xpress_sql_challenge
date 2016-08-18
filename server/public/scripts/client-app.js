$(document).ready(function(){
  console.log('works');
  getAnimals();

  $('#animal-submit').on('click', postAnimal);
});

function getAnimals(){
  $.ajax({
    type: 'GET',
    url: '/animals',
    success: function(animal) {
      console.log('GET /animals returns:', animal);

      animal.forEach(function (animal) {
        var $el = $('<div></div>');
        $el.append('<strong>' + animal.type + '</strong>');
        $el.append('<strong>' + "       " + animal.number + '</strong>');

        $('#animal-container').append($el);
      });
    },

    error: function (response) {
      console.log('GET /books fail. No books could be retrieved!');
    },
  });
}


function postAnimal(){
  event.preventDefault();
  var animal = {};

$.each($('#animal-form').serializeArray(), function (i, field) {
  animal[field.name] = field.value;
});

$.ajax({
  type: 'POST',
  url: '/numbers',
  data: animal,
  success: function () {
    console.log('POST /animals works!');
    $('#animal-container').empty();
    getAnimals();
  },

  error: function (response) {
    console.log('POST /animals does not work...');
  },
});
}
