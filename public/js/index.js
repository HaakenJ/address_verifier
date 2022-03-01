// Get references to page elements
var countryDropdown = $('#country-dropdown');
var stateInput = $('#state-input');

$(document).ready(function() {
  stateInput.hide();

  // initialize country dropdown
  $('.dropdown-trigger').dropdown();

  // get countries and display in dropdown
  $.get("/api/countries", (response) => {
    response.forEach(country => {      
      countryDropdown.append('<li><a onClick="showDistrict(' 
      + country.districtLabel + ')" href="#!">' + country.name + '</a></li>');      
    })
  })
})

function showDistrict(label) {
  // var label = label.charAt(0).toUpperCase() + label.slice(1);
  $('#state-box-label').text(label);
  stateInput.show();
}