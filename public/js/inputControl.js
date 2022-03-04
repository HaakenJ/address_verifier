// display district input and call the autocomplete populator
function showDistrict(country) {
    countryDropdownTitle.text(capitalizeFirstLetter(country.name));

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
            districtDropdownTitle.text(capitalizeFirstLetter(result.name));
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
        cityDropdownTitle.text(capitalizeFirstLetter(result.name));

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
function displayMatchingAddresses(matches) {
    
    // loop through matches
    matches.forEach(address => {
        // get a string of the formatted address
        var formattedAddress = formatAddress(address);

        // create a new element to display the address
        var addressCard = '<div class="row"> \
            <div class="col s12 m5 margin-auto pre-line"> \
                <div class="card-panel"> \
                    <span class="">' + formattedAddress + '</span> \
                </div> \
            </div> \
        </div>'

        $('#results-container').append(addressCard);
    });
    // add the element to the page for display
}

// asynchronous function to get all addresses matching the current input on the form
// the call to the server is asynchronous so we will specify that this function returns a promise
// once the get call is done, it will resolve the promise with the result, informing the 'await' 
// part of the function that it can continue.  
async function getMatchingAddresses() {

    var promise = new Promise((resolve, reject) => {
        // create data that will be sent
        var data = {
            country: '',
            district: '',
            city: '',
            postcode: '',
            address: ''
        }

        // populate data with entered values on the form
        data.country = countryDropdownTitle.text() !== 'Click to select your country!' ? countryDropdownTitle.text() : '';
        data.district = districtDropdownTitle.text() !== 'Click to select your district!' ? districtDropdownTitle.text() : '';
        data.city = cityDropdownTitle.text() !== 'Click to select your city!' ? cityDropdownTitle.text() : '';
        data.postcode = postcodeText.val() !== '' ? postcodeText.val() : '';
        data.address = addressText.val() !== '' ? addressText.val() : '';        

        $.get('/api/matches', data, result => {
            resolve(result);
          })
    })

    var result = await promise;
    
    return result;
}