
var userSearchQuery;
var userResultsLimit;
var queryURL;

// Creates onClick Event for Submit Button to update page w/ search results
$("#search").on("click", function(event) {
  event.preventDefault();
  processUserInput()
});


// Processes input updates queryURL
function processUserInput() {

  // Creates queryURL for ajax request
  userSearchQuery = $("#search-term").val();
  userResultsLimit = $("#number-received").val();
  queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userSearchQuery + "&limit=" + userResultsLimit + "&api-key=C7QhoZeFxrd3ER1grZm6qFmXBQ6ig2Jl"
  console.log(queryURL)

  // Calls function that sends the ajax request
  requestInfo();

};

// Requests info via queryURL
function requestInfo() {
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(res) {

    // Makes function call to update page with search results
    updateResults(res);
  }); 
};

// Updates html w/ Search results
function updateResults(res) {
  var articles = res.response.docs;
  console.log(articles)
  articles.forEach(function(article) {
    console.log(article)
  var resultDiv = $("<article>");
  var title = $("<h2>").text(article.headline.main);
  var snippet = $("<p>").text(article.lead_paragraph);
  resultDiv.prepend(title, snippet);
  $("#top-articles").append(resultDiv);
  });
}