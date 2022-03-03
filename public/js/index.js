// Get references to page elements
// this is jQuery syntax to select an html element
// the # is the same as css and is used to select by id
var countryDropdown = $('#country-dropdown');

var districtDropdown = $('#district-dropdown-title');
var districtList = $('#district-dropdown');

var cityDropdown = $('#city-dropdown-title');
var cityList = $('#city-dropdown');

var postcodeInput = $('#postcode-input');
var postcodeText = $('#postcode-box');

var addressInput = $('#address-input');
var addressText = $('#address-box');
var addressSubmit = $('#address-submit');

// this method runs automatically as soon as the page is rendered
// this is basically the main function
$(document).ready(function() {
  // hide inputs
  districtDropdown.hide();
  cityDropdown.hide();
  postcodeInput.hide();
  addressInput.hide();

  // initialize country dropdown
  $('.dropdown-trigger').dropdown();

  // get countries and display in dropdown
  // this sends a get request to that url then the next parameter
  // is a function to run with the response
  $.get('/api/countries', (response) => {
    // loop through response and add list items to the dropdown
    response.forEach(country => {      
      var listItem = $('<li><a href=#!>' + country.name + '</a></li>');

      // add onClick methods to each list item
      listItem.on('click', () => showDistrict(country));
      countryDropdown.append(listItem);
    })
  })

  // submit the address that was entered
  addressSubmit.on('click', () => {
    // get all matching addresses to the input
    $.get('/api/matches', {
      country: countryDropdown.text(),
      district: districtDropdown.text(),
      city: cityDropdown.text(),
      postcode: postcodeText.val(),
      address: addressText.val()
    }, result => {
      // display the results passing in the array of matches
      displayResults(result);
    })
  })
})
