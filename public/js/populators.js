// these methods populate the autocomplete lists for all inputs

function populateDistrictDropdown(country) {
    districtList.empty();
    // get districts by country
    $.get('/api/districts/country', {country: country}, results => {  
        results.forEach(result => {      
            var listItem = $('<li><a href=#!>' + capitalizeFirstLetter(result.district) + '</a></li>');
        
            // add onClick methods to each list item
            listItem.on('click', () => showCity(result.district));
            districtList.append(listItem);
        })        
    })
}
  
function populateCityDropdown(district) {
    cityList.empty();
    // get cities by district
    $.get('/api/cities/district', {district: district}, results => {
        results.forEach(result => {      
            var listItem = $('<li><a href=#!>' + capitalizeFirstLetter(result.city) + '</a></li>');
        
            // add onClick methods to each list item
            listItem.on('click', () => showAddressAndPostcode(result.city));
            cityList.append(listItem);
        })        
    })
}

function populateAddressAutocomplete(city) {
    // get address line 1 by city
    $.get('/api/addresses/1/city', {name: city}, results => {        

        var data = {};
        results.forEach(result => {
            data[result.addressLine1] = null;
        });

        $('input.address-autocomplete-1').autocomplete({
            data: data
        })
    })

    // get address line 2 by city
    $.get('/api/addresses/2/city', {name: city}, results => {        

        var data = {};
        results.forEach(result => {
            data[result.addressLine2] = null;
        });

        $('input.address-autocomplete-2').autocomplete({
            data: data
        })
    })
}

function populatePostcodeAutocomplete(city) {
    // get postcodes by city
    $.get('/api/postcodes/city', {name: city}, results => {

        var data = {};
        results.forEach(result => {
            data[result.postcode] = null;
        });

        $('input.postcode-autocomplete').autocomplete({
            data: data
        })
    })
}
