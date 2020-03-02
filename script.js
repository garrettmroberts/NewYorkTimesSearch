
var userSearchQuery;
var userResultsLimit;



// console.log($())

$("#search").on("click", function(event) {
  event.preventDefault();
  
  userSearchQuery = $("#search-term").val();
  userResultsLimit = $("#number-received").val();
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userSearchQuery + "&limit=" + userResultsLimit + "&api-key=C7QhoZeFxrd3ER1grZm6qFmXBQ6ig2Jl"
  console.log(queryURL)


  event.preventDefault();
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(res) {
    var articles = res.response.docs;
    console.log(articles)
    articles.forEach(function(article) {
      console.log(article)
    var resultDiv = $("<article>");
    var title = $("<h2>").text(article.headline.main);
    var snippet = $("<p>").text(article.lead_paragraph);
    resultDiv.append(title, snippet);
    $("#top-articles").append(resultDiv);
    })
  })


});