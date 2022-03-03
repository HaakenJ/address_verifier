function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1); 
}

function formatAddress(address) {
    var format = formats[address.country];
    console.log(JSON.stringify(format));
    return "";
}