var app = angular.module('WikiApp', []);

app.controller('MainCtrl', function($scope, $http){

  var searchEl = $('#input');
  var labelEl = $('#label');

  $('#label').on('click', function(){
    $('#directions').hide();
    $('#input').children('input').css({'left': '0', 'transition': 'left 0.3s', 'background-color': 'white'});
    $(this).children('label').css('background-color', '#23688b');
  });

  $(document).on('click', function(e){
    var clickedID = e.target.id;
    if (clickedID != 'search-terms' && clickedID != 'search-label') {
      $('#directions').fadeIn();
      $('#label').css('background-color', 'white');
      $('#label').children('label').css('background-color', '#23688b');
      $('#input').children('input').css('left', '-1000px');
    }
  });

  $scope.search = function(){

    $scope.results = [];
    var title = $('input').val();

    var url = 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&format=json&exsentences=1&exlimit=max&exintro=&explaintext=&pilimit=max&generator=search&gsrlimit=10&gsrsearch='
    var callback = '&callback=JSON_CALLBACK'
    var pageURL = 'http://en.wikipedia.org/?curid=';

    $http.jsonp(url + title + callback).success(function(data){
      var pages = data.query.pages;

      angular.forEach(pages, function(value, key){
        $scope.results.push({title: value.title, extract: value.extract, url: pageURL + value.pageid});
      });
    });
  };
});
