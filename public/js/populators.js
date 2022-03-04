// these methods populate the autocomplete lists for all inputs

function populateDistrictDropdown(countryId) {
    districtList.empty();
    // get districts by country
    $.get('/api/districts/countryId', {id: countryId}, result => {  
        result.forEach(district => {      
            var listItem = $('<li><a href=#!>' + capitalizeFirstLetter(district.name) + '</a></li>');
        
            // add onClick methods to each list item
            listItem.on('click', () => showCity(district));
            districtList.append(listItem);
        })        
    })
}
  
function populateCityDropdown(districtId) {
    cityList.empty();
    // get cities by district
    $.get('/api/cities/districtId', {id: districtId}, result => {
        result.forEach(city => {      
            var listItem = $('<li><a href=#!>' + capitalizeFirstLetter(city.name) + '</a></li>');
        
            // add onClick methods to each list item
            listItem.on('click', () => showAddressAndPostcode(city));
            cityList.append(listItem);
        })        
    })
}

function populateAddressAutocomplete(cityId) {
    // get address line 1 by city
    $.get('/api/addresses/1/cityId', {id: cityId}, result => {        

        var data = {};
        result.forEach(address => {
            data[address.name] = null;
        });

        $('input.address-autocomplete-1').autocomplete({
            data: data
        })
    })

    // get address line 2 by city
    $.get('/api/addresses/2/cityId', {id: cityId}, result => {        

        var data = {};
        result.forEach(address => {
            data[address.name] = null;
        });

        $('input.address-autocomplete-2').autocomplete({
            data: data
        })
    })
}

function populatePostcodeAutocomplete(cityId) {
    // get postcodes by city
    $.get('/api/postcodes/cityId', {id: cityId}, result => {

        var data = {};
        result.forEach(postcode => {
            data[postcode.name] = null;
        });

        $('input.postcode-autocomplete').autocomplete({
            data: data
        })
    })
}
