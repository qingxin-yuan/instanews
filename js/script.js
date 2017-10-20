(function ($) {
  $('select').change(function () {
    $('header').animate({
      height: 'auto',
      margin: '0 auto',
      padding: 0
    }, 500);
    $('ul').append('<img src="./assets/images/ajax-loader.gif" class="loading">');
    var input = $('select option:selected').val(), url;
    // console.log(input);
    if (input !== 'sections') {
      url = 'https://api.nytimes.com/svc/topstories/v2/' + input + '.json';
      url += '?' + $.param({
        'api-key': 'd26bfdbb8f424d1a87afa99e2e8989b5'
      });
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function (result) {
        // console.log(result);
        result = result.results;
        $('ul').empty();
        //function for sorting articles
        var total = 12,
            length;
        $.each(result, function (index, value) {
          if ((index < total) && (value.multimedia.length !== 0)) {
            length = value.multimedia.length;
            console.log(value.multimedia);
            $('.article').append('<li><a href="' + value.url + '"><img src="' + value.multimedia[length-1].url + '" class="article-image"><p class="article-abstract">' + value.abstract + '</p></a></li>');
          }else if((index < total) && (value.multimedia.length===0)){
            total++;
          }
          else if (index ===total) {
            return false;
          }
          console.log(index);
        })
      }).fail(function (err) {
        throw err;
      }).always(function () {
        $('.loading').remove();
      });
    }
  });
})(jQuery)