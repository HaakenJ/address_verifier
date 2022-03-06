// these methods populate the autocomplete lists for all inputs

function populateDistrictDropdown(countryName) {
    districtList.empty();
    // get districts by country
    $.get('/api/districts/country', {name: countryName}, results => {  
        results.forEach(result => {      
            var listItem = $('<li><a href=#!>' + capitalizeFirstLetter(result.district) + '</a></li>');
        
            // add onClick methods to each list item
            listItem.on('click', () => showCity(result.district));
            districtList.append(listItem);
        })        
    })
}
  
function populateCityDropdown(districtName) {
    cityList.empty();
    // get cities by district
    $.get('/api/cities/district', {name: districtName}, results => {
        results.forEach(result => {      
            var listItem = $('<li><a href=#!>' + capitalizeFirstLetter(result.city) + '</a></li>');
        
            // add onClick methods to each list item
            listItem.on('click', () => showAddressAndPostcode(result.city));
            cityList.append(listItem);
        })        
    })
}

function populateAddressAutocomplete(cityName) {
    // get address line 1 by city
    $.get('/api/addresses/1/city', {name: cityName}, results => {        

        var data = {};
        results.forEach(result => {
            data[result.addressline1] = null;
        });

        $('input.address-autocomplete-1').autocomplete({
            data: data
        })
    
        var data2 = {};
        results.forEach(result => {
            data2[result.addressline2] = null;
        });

        $('input.address-autocomplete-2').autocomplete({
            data2: data2
        })
    })    
}

    // get address line 2 by city
//     $.get('/api/addresses/2/city', {name: cityName}, results => {        

//         var data2 = {};
//         results.forEach(result => {
//             data[result.addressLine2] = null;
//         });

//         $('input.address-autocomplete-2').autocomplete({
//             data: data
//         })
//     })
// }

function populatePostcodeAutocomplete(cityName) {
    // get postcodes by city
    $.get('/api/postcodes/city', {name: cityName}, results => {

        var data = {};
        results.forEach(result => {
            data[result.postcode] = null;
        });

        $('input.postcode-autocomplete').autocomplete({
            data: data
        })
    })
}
