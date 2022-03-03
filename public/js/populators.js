// these methods populate the autocomplete lists for all inputs

function populateDistrictDropdown(countryId) {
    // get districts by country
    $.get('/api/districts/countryId', {countryId: countryId}, result => {  
        result.forEach(district => {      
            var listItem = $('<li><a href=#!>' + capitalizeFirstLetter(district.name) + '</a></li>');
        
            // add onClick methods to each list item
            listItem.on('click', () => showCity(district));
            districtList.append(listItem);
        })        
    })
}
  
function populateCityDropdown(districtId) {
    // get cities by district
    $.get('/api/cities/districtId', {districtId: districtId}, result => {
        result.forEach(city => {      
            var listItem = $('<li><a href=#!>' + capitalizeFirstLetter(city.name) + '</a></li>');
        
            // add onClick methods to each list item
            listItem.on('click', () => showAddressAndPostcode(city));
            cityList.append(listItem);
        })        
    })
}

function populateAddressAutocomplete(cityId) {
    // get addresses by city
    $.get('/api/addresses/cityId', {cityId: cityId}, result => {
        
        var data = {};
        result.forEach(address => {
            data[capitalizeFirstLetter(address.name)] = null;
        });

        $('input.address-autocomplete').autocomplete({
            data: data
        })
    })
}

function populatePostcodeAutocomplete(cityId) {
    // get postcodes by city
    $.get('/api/postcodes/cityId', {cityId: cityId}, result => {
        
        var data = {};
        result.forEach(postcode => {
            data[postcode.code] = null;
        });

        $('input.postcode-autocomplete').autocomplete({
            data: data
        })
    })
}
