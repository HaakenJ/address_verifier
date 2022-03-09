// this method runs automatically as soon as the page is rendered
// this is basically the main function
$(document).ready(function() {
  // hide inputs
  districtDropdown.hide();
  cityDropdown.hide();
  postcodeInput.hide();
  addressInput1.hide();
  addressInput2.hide();

  // initialize country dropdown
  $('.dropdown-trigger').dropdown();

  // get countries and display in dropdown
  // this sends a get request to that url then the next parameter
  // is a function to run with the response
  $.get('/api/countries', results => {
    // loop through response and add list items to the dropdown
    results.forEach(result => {      
      var listItem = $('<li><a href=#!>' + result.country_name + '</a></li>');

      // add onClick methods to each list item
      listItem.on('click', () => showDistrict(result));
      countryDropdown.append(listItem);
    })
  })

  // submit the address that was entered
  addressSubmit1.on('click', () => {
    // get and display all matching addresses to the input
    getMatchingAddresses();    
  })

  addressSubmit2.on('click', () => {
    // get and display all matching addresses to the input
    getAnythingMatches();    
  })

  addressWhateverSubmit.on('click', () => {
    //get anything that matches the given input
    getAnythingMatches();
  })


})
