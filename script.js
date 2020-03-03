
var queryURL;
var userSearchQuery;
var userResultsLimit;
var userStartYear;
var userEndYear;

// Creates onClick Event for Submit Button to update page w/ search results
$("#search").on("click", function(event) {
  event.preventDefault();
  processUserInput()
});


// Processes input updates queryURL
function processUserInput() {

  // creates variables for the queryURL
  userSearchQuery = $("#search-term").val();
  userResultsLimit = $("#number-received").val();
  userStartYear = $("#start-year").val();
  userEndYear = $("#end-year").val();


  // Creates queryURL for ajax request
  queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userSearchQuery + "&api-key=C7QhoZeFxrd3ER1grZm6qFmXBQ6ig2Jl"
  console.log(queryURL)

  // Calls function that sends the ajax request
  requestInfo();

};

// Requests info via queryURL
// We need to call this function x number of times to get everyhting the user requested.  We can do this by setting offset=x for each call.
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