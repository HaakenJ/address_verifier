// display district input and call the autocomplete populator
function showDistrict(country) {
    $('#dropdown-title').text(capitalizeFirstLetter(country.name));
    
    label = capitalizeFirstLetter(country.districtLabel);
    $('#state-box-label').text(label);
    stateInput.show();
  
    populateDistrictAutocomplete(country.id);
  }
  
// display city input and call the autocomplete populator
function showCity(district) {
    // hide the state submit button to make things more organized
    stateSubmit.hide();

    cityInput.show();

    // get the district by name
    $.get('/api/districts/name', {name: district}, (result, status) => {
        // populate the autocomplete only if the request was successful
        if (status === 'success') {
        populateCityAutocomplete(result.id);
        } else {
        alert('Invalid District Input: No matching district found');
        }
    })
}

// display address input and call the autocomplete populator
function showAddress(city) {
    // hide the city submit button to make things more organized
    citySubmit.hide();

    addressInput.show();

    // get the city by name
    $.get('/api/cities/name', {name: city}, (result, status) => {
        // populate the autocomplete only if the request was successful
        if (status === 'success') {
            populateAddressAutocomplete(result.id);
        } else {
            alert('Invalid City Input: No matching city found');
        }
    })
}