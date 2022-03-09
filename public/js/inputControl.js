// display district input and call the autocomplete populator
function showDistrict(country) {
    countryDropdownTitle.text(capitalizeFirstLetter(country.country_name));

    districtDropdown.text("Click to select your " + country.district_type + "!");
    districtDropdown.show();
  
    populateDistrictDropdown(country.country_name);
  }
  
// display city input and call the autocomplete populator
function showCity(districtName) {
    // get the district by name
    $.get('/api/cities/district', {name: districtName}, (result, status) => {
        //populate the dropdown only if the request was successful
        if (status === 'success') {
            districtDropdownTitle.text(capitalizeFirstLetter(districtName));
            cityDropdown.show();
            //FIXME can we not pass the entire result instead?         
            populateCityDropdown(districtName);
        } else {
            alert('Invalid District Input: No matching district found');
        }
    })
}

// display address input and call the autocomplete populator
function showAddressAndPostcode(cityName) {

    postcodeInput.show();
    addressInput1.show();
    addressInput2.show();

    // get the city by name
    $.get('/api/cities/name', {name: cityName}, (result, status) => {
        cityDropdownTitle.text(capitalizeFirstLetter(result.city));
        // populate the autocomplete only if the request was successful
        if (status === 'success') {
            var cityParam = result.city;
            populateAddressAutocomplete(cityParam);
            populatePostcodeAutocomplete(cityParam);
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

        //FIXME: this line is only for test reading the result and show on UI
        // var final = address.addressline1 + "\n" + address.city + "\n" + address.country_name;

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
function getMatchingAddresses() {
    var data = {
        countryName: '',
        district: '',
        city: '',
        postcode: '',
        addressLine1: '',
        addressLine2: ''
    }

    // populate data with entered values on the form
    data.countryName = countryDropdownTitle.text() !== 'Click to select your country!' ? countryDropdownTitle.text() : '';
    data.district = districtDropdownTitle.text().includes('Click to select your') === false ? districtDropdownTitle.text() : '';
    data.city = cityDropdownTitle.text() !== 'Click to select your city!' ? cityDropdownTitle.text() : '';
    data.postcode = postcodeText.val() !== '' ? postcodeText.val() : '';
    data.addressLine1 = addressText1.val() !== '' ? addressText1.val() : '';        
    data.addressLIne2 = addressText2.val() !== '' ? addressText2.val() : '';

    $.get('/api/matches', data, (result, status) => {
        displayMatchingAddresses(result);
    })
}

function getAnythingMatches(){
    var data = {
        countryName: '',
        district: '',
        city: '',
        postcode: '',
        addressLine1: '',
        addressLine2: ''
    }    

    // populate data with entered values on the form
    data.countryName = countryText.val() !== '' ? countryText.val() : '';
    data.district = districtText.val() !== '' ? districtText.val() : '';
    data.city = cityText.val() !== '' ? cityText.val() : '';
    data.postcode = postcode2Text.val() !== '' ? postcodeText.val() : '';
    data.addressLine1 = address1Text1.val() !== '' ? address1Text1.val() : '';        
    data.addressLIne2 = address2Text2.val() !== '' ? address2Text2.val() : '';

    console.log('getAnythingMatches data: ' + JSON.stringify(data));

    $.get('/api/addresses/find', data, (result, status) => {
        displayMatchingAddresses(result);
    })

    // $.get('api/addresses/find', {input: addressTextWhatever.val()}, (result, status) => {
    //     displayMatchingAddresses(result, resultsContainer2);
    // })
}