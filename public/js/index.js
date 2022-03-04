// Get references to page elements
// this is jQuery syntax to select an html element
// the # is the same as css and is used to select by id
var countryDropdown = $('#country-dropdown');
var countryDropdownTitle = $('#country-dropdown-title');

var districtDropdown = $('#district-dropdown-title');
var districtList = $('#district-dropdown');
var districtDropdownTitle = $('#district-dropdown-title');

var cityDropdown = $('#city-dropdown-title');
var cityList = $('#city-dropdown');
var cityDropdownTitle = $('#city-dropdown-title');

var postcodeInput = $('#postcode-input');
var postcodeText = $('#postcode-box');

var addressInput1 = $('#address-input-1');
var addressText1 = $('#address-box-1');

var addressInput2 = $('#address-input-2');
var addressText2 = $('#address-box-2');

var addressSubmit = $('#address-submit');

var resultsContainer = $('#results-container');

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
  $.get('/api/countries', (response) => {
    // loop through response and add list items to the dropdown
    response.forEach(country => {      
      var listItem = $('<li><a href=#!>' + country.country_name + '</a></li>');

      // add onClick methods to each list item
      listItem.on('click', () => showDistrict(country));
      countryDropdown.append(listItem);
    })
  })

  // submit the address that was entered
  addressSubmit.on('click', () => {
    // get all matching addresses to the input
    // .then specifies that we will wait until this function is complete before continuing
    getMatchingAddresses().then(result => {
      // display the results passing in the array of matches
      displayMatchingAddresses(result);
    })    
  })
})
