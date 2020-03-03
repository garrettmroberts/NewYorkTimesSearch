
var userSearchQuery;
var userResultsLimit;




// Creates onClick Event for Submit Button to update page w/ search results
$("#search").on("click", function(event) {
  event.preventDefault();
  processUserInput()
});


// Processes input and returns what user requested
function processUserInput() {

  // Creates queryURL for ajax request
  userSearchQuery = $("#search-term").val();
  userResultsLimit = $("#number-received").val();
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userSearchQuery + "&limit=" + userResultsLimit + "&api-key=C7QhoZeFxrd3ER1grZm6qFmXBQ6ig2Jl"
  console.log(queryURL)

  // Requests info via queryURL and populates results
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
    });
  });
};