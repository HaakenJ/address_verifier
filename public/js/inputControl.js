// display district input and call the autocomplete populator
function showDistrict(country) {
    $('#country-dropdown-title').text(capitalizeFirstLetter(country.name));

    districtDropdown.text("Click to select your " + country.districtLabel + "!");
    districtDropdown.show();
  
    populateDistrictDropdown(country.id);
  }
  
// display city input and call the autocomplete populator
function showCity(district) {    
    // get the district by name
    $.get('/api/districts/name', {name: district}, (result, status) => {
        // populate the dropdown only if the request was successful
        if (status === 'success') {
            $('#district-dropdown-title').text(capitalizeFirstLetter(result.name));
            cityDropdown.show();          
            populateCityDropdown(result.id);
        } else {
            alert('Invalid District Input: No matching district found');
        }
    })
}

// display address input and call the autocomplete populator
function showAddressAndPostcode(city) {

    postcodeInput.show();
    addressInput.show();

    // get the city by name
    $.get('/api/cities/name', {name: city}, (result, status) => {
        $('#city-dropdown-title').text(capitalizeFirstLetter(result.name));

        // populate the autocomplete only if the request was successful
        if (status === 'success') {
            populateAddressAutocomplete(result.id);
            populatePostcodeAutocomplete(result.id);
        } else {
            alert('Invalid City Input: No matching city found');
        }
    })
}

// format and display the matching addresses
// takes in an array of address objects
function displayMatches(matches) {
    // loop through matches
    matches.array.forEach(address => {
        // get a string of the formatted address
        var formattedAddress = getFormat(address);
    });
    // add the element to the page for display
}