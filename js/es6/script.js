(function ($) {
  $('select').change(()=> {
    
    $('ul').empty();
    //REPOSITION/RESIZING HEADER AFTER SELECTION IS MADE
    $('header').addClass('header-after');
    $('.logo').addClass('logo-after');
    $('body').css('height','auto');

    //ADD LOADING GIF WHEN SELECTION BAR IS CLICKED
    $('ul').append('<li class="loading"><img src="./assets/images/ajax-loader.gif"></li>');

    //FETCH DATA FROM NYT API
    let input = $('select option:selected').val(), url;
    if (input !== 'sections') {
      url = `https://api.nytimes.com/svc/topstories/v2/${input}.json`;
      url += '?' + $.param({
        'api-key': 'd26bfdbb8f424d1a87afa99e2e8989b5'
      });
      $.ajax({
        url: url,
        method: 'GET'
      })

      //DATA PROCESSING IF RETRIVING DATA WAS SUCCESSFUL
      .done((result)=> {
        result = result.results;

        //FUNCTION FOR ARTICLE FILTERING
        //METHOD I - FILTER & SLICE FUNCTION
        result.filter((result)=>{
          if (result.multimedia.length !== 0){
            return result;
          }
        }).slice(0,12).forEach((result)=>{
          $('ul').append(`<li class="article-item"><a href="${result.url}" target="_blank"><img src="${result.multimedia[result.multimedia.length-1].url}"><p>${result.abstract}</p></a></li>`);
        })

        //METHOD II - USING NESTED IF ELSE STATEMENTS
        // var total = 12,
        // length;
        // $.each(result, function (index, value) {
        //   if ((index < total) && (value.multimedia.length !== 0)) {
        //     length = value.multimedia.length;
        //     // console.log(value.multimedia);
        //     $('.article').append('<li><a href="' + value.url + '" target="_blank"><img src="' + value.multimedia[length-1].url + '" class="article-image"><p class="article-abstract">' + value.abstract + '</p></a></li>');
        //   }else if((index < total) && (value.multimedia.length===0)){
        //     total++;
        //   }
        //   else if (index ===total) {
        //     return false;
        //   }
        // })
      })

      //IGNORE RETRIVED DATA IF FAILED
      .fail((err)=> {
        //PRINT ERROR MESSAGE IF REQUEST FAILS
        $('body').append('<p class="error-message">Sorry, there has been a problem, please come back later.</p>');

        throw err;
      })
      
      //REMOVE LOADING GIF WHEN FETCHING IS DONE
      .always(()=>{
        $('.loading').remove();
      });
    }
  });
})(jQuery);

