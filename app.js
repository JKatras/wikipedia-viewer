//API Sandbox: https://www.mediawiki.org/wiki/API:Main_page
var resultsField = $('.results-field');
var baseApiURL = '//en.wikipedia.org/w/api.php';
var baseWikiURL = 'https://en.wikipedia.org/wiki/';
$(document).ready(function() {
  $('#search-btn').on('click', function() {
    var query = $('#query').val();
    if (query) {
      resultsField.fadeOut(200,function(){
        resultsField.empty();
        searchApi(query);
      });
    }
  });
  $( "#query" ).keyup(function(event) {
   var query = $('#query').val();
    if(event.which==13){
      if (query) {
        resultsField.fadeOut(200,function(){
          resultsField.empty();
          searchApi(query);
        });
      }
    }  
  });
});
  function searchApi(searchParam) {
    $.ajax({
      url: baseApiURL,
      data: {
        action: 'query',
        format: 'json',
        prop: 'images',
        sroffset: 20,
        srsearch: searchParam,
        list: 'search'
      },
      dataType: 'jsonp',
      headers: {
        'Api-User-Agent': 'Example/1.0'
      },
      success: function(data) {
        var result = data.query.search;
        displayResults(result);
      },
      error: function(jqXHR, error, errorThrown) {
        resultsField.html("<p>An error occurred; please check your search terms and try again.</p>");
      }
    });
  }

  function displayResults(result) {
      $.each(result, function(i) {
        var title = result[i].title;
        var snippet = result[i].snippet + '...';
        var wikiLink = baseWikiURL + title;
        resultsField.append("<div class='result'><a href='" + wikiLink + "'" + " target='_blank'>" + "<h3>" + title + "</h3><p>" + snippet + "</p></a></div>");
      });
       resultsField.fadeIn();
  };