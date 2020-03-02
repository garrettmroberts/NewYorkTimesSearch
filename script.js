
var userSearchQuery;
var userResultsLimit;

var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userSearchQuery + "&fl=" + userResultsLimit + "&api-key=C7QhoZeFxrd3ER1grZm6qFmXBQ6ig2Jl"


// console.log($())

$("#search").on("click", function(event) {
  event.preventDefault();

  userSearchQuery = $("#search-term").val();
  userResultsLimit = $("#number-received").val();
  console.log(userSearchQuery);
  console.log(userResultsLimit)


  event.preventDefault();
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(res) {
    console.log(res)
  })


});