// Get references to page elements
// this is jQuery syntax to select an html element
// the # is the same as css and is used to select by id
var countryDropdown = $('#country-dropdown');
var stateInput = $('#state-input');
var stateText = $('#state-box');
var stateSubmit = $('#state-submit');
var cityInput = $('#city-input');
var cityText = $('#city-box');
var citySubmit = $('#city-submit');
var addressInput = $('#address-input');
var addressText = $('#address-box');
var addressSubmit = $('#address-submit');

// this method runs automatically as soon as the page is rendered
// this is basically the main function
$(document).ready(function() {
  // hide inputs
  stateInput.hide();
  cityInput.hide();
  addressInput.hide();


  // add onlcick handlers
  stateSubmit.on('click', () => showCity(stateText.val()));
  citySubmit.on('click', () => showAddress(cityText.val()));

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
})
