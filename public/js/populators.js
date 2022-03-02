// these methods populate the autocomplete lists for all inputs

function populateDistrictAutocomplete(countryId) {
    // get districts by country
    $.get('/api/districts/countryId', {countryId: countryId}, result => {  
        var data = {};
        result.forEach(district => {
            data[capitalizeFirstLetter(district.name)] = null;
        });
  
        $('input.state-autocomplete').autocomplete({
            data: data
        })
    })
}
  
function populateCityAutocomplete(districtId) {
    // get cities by district
    $.get('/api/cities/districtId', {districtId: districtId}, result => {
        
        var data = {};
        result.forEach(city => {
        data[capitalizeFirstLetter(city.name)] = null;
        });

        $('input.city-autocomplete').autocomplete({
        data: data
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
