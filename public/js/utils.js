function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1); 
}

function formatAddress(address) {
    // get the format for the country
    var format = formats[address.country]['format'];
    var result = "";

    // loop through the format lines
    // for-in syntax is for js objects
    // for-of syntax is for arrays and other normal iterables
    for (var line in format) {
        for (var addressPart of format[line]) {
            var value = "";

            var value = (addressPart === 'city' || addressPart === 'district') 
                    ? capitalizeFirstLetter(address[addressPart]) 
                    : address[addressPart];

            result += (value + " ");
        }
        result += "\n";
    }
    return result;
}