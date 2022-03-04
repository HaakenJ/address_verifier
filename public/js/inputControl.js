// display district input and call the autocomplete populator
function showDistrict(country) {
    countryDropdownTitle.text(capitalizeFirstLetter(country.country_name));

    districtDropdown.text("Click to select your " + country.districtLabel + "!");
    districtDropdown.show();
  
    populateDistrictDropdown(country.country_name);
  }
  
// display city input and call the autocomplete populator
function showCity(district) {    
    // get the district by name
    $.get('/api/districts/name', {name: district.name}, (result, status) => {
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
    addressInput1.show();
    addressInput2.show();

    // get the city by name
    $.get('/api/cities/name', {name: city.name}, (result, status) => {
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
    resultsContainer.empty();
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

        resultsContainer.append(addressCard);
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
            address1: '',
            address2: '',
        }

        // populate data with entered values on the form
        data.country = countryDropdownTitle.text() !== 'Click to select your country!' ? countryDropdownTitle.text() : '';
        data.district = districtDropdownTitle.text() !== 'Click to select your district!' ? districtDropdownTitle.text() : '';
        data.city = cityDropdownTitle.text() !== 'Click to select your city!' ? cityDropdownTitle.text() : '';
        data.postcode = postcodeText.val() !== '' ? postcodeText.val() : '';
        data.address1 = addressText1.val() !== '' ? addressText1.val() : '';        
        data.address2 = addressText2.val() !== '' ? addressText2.val() : '';        

        $.get('/api/matches', data, result => {
            resolve(result);
          })
    })

    var result = await promise;
    
    return result;
}