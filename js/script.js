(function ($) {


  $('select').change(function(){
    $('ul').append('<img src="../assets/images/ajax-loader.gif" class="loading">');
    var input = $('select option:selected').val(),url;
    // console.log(input);
    if (input !=='sections'){
      url = 'https://api.nytimes.com/svc/topstories/v2/'+input+'.json';
      url += '?' + $.param({
        'api-key': 'd26bfdbb8f424d1a87afa99e2e8989b5'
      });
      $.ajax({
        url: url,
        method: 'GET',
      }).done(function(result) {
     
        // var output = '';
        result = result.results;
        // console.log(result);
        $('ul').empty();
        
        $.each(result,function(index,value){
          if (index<=11) {
            $('.article').append('<li><img src="'+value.multimedia[4].url+'" class="article-image"><p class="article-abstract">'+value.abstract+'</p></li>');
          }
        })
        
      }).fail(function(err) {
        throw err;
      }).always(function(){
        $('.loading').remove();

      });
      }       
  });

  })(jQuery)