// Creates global variables
var queryURL;
var userSearchQuery;
var userResultsLimit;
var userStartYear;
var userEndYear;

// Creates onClick Event for Submit Button to update page w/ search results
$("#search").on("click", function(event) {
  event.preventDefault();
  $("#top-articles").empty();
  processUserInput()
});

// Processes input updates queryURL
function processUserInput() {

  // Gives values to variables for the queryURL
  userSearchQuery = $("#search-term").val();
  userResultsLimit = $("#number-received").val();
  userStartYear = $("#start-year").val();
  userEndYear = $("#end-year").val();
  
  // Calls function that sends the ajax request
  requestInfo();
  
};

// &facet_field=day_of_week&facet=true&begin_date=20120101&end_date=20120101
// Requests info via queryURL
function requestInfo() {
  
  // Creates number of times that AJAX request will need to be made to get the correct amount of results
  var repeatAjaxTimes = Math.ceil(userResultsLimit / 10);
  
  // For Loop updates page # for each ajax call
  for (var i = 0; i < repeatAjaxTimes; i++) {

    // Creates query URL if user doesn't specify a begin or end year
    if (userStartYear === "") {
      queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userSearchQuery + "&page=" + i + "&api-key=C7QhoZeFxrd3ER1grZm6qFmXBQ6ig2Jl";

      // Formats queryURL with a start and end year
    } else {
      var formattedStartYear = userStartYear.toString() + "0101";
      var formattedEndYear = userEndYear.toString() + "0101";
      
      queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + userSearchQuery + "&page=" + i + "&begin_date=" + formattedStartYear + "&end_date=" + formattedEndYear + "&api-key=C7QhoZeFxrd3ER1grZm6qFmXBQ6ig2Jl";
    }
    console.log(queryURL)
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(res) {
      console.log(res)
      // Makes function call to update page with search results
      updateResults(res);
    }); 
  }
};

// Updates html w/ Search results
function updateResults(res) {
  var articles = res.response.docs;
  
  // ForEach loop creates new article sections for HTML and appends to results
  articles.forEach(function(article) {

    // New articles are added to list only if number of articles is less than the user's limit
    if ($("article").length < userResultsLimit) {
      var resultDiv = $("<article>");
      var title = $("<h2>").text(article.headline.main);
      var snippet = $("<p>").text(article.lead_paragraph);
      resultDiv.prepend(title, snippet);
      $("#top-articles").append(resultDiv);
    };
  });
}