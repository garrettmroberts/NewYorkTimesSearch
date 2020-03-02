var urlObj = {
  "api-key": "C7QhoZeFxrd3ER1grZm6qFmXBQ6ig2Jl",
  "q": userSearchQuery,
  "fl": userResultsLimit,
};

var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + urlObj;


$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function() {

});