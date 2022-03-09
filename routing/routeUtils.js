function buildSearchQuery(address) {
    var data = {};

    if (address.addressLine1 !== '') {
        data.addressline1 = address.addressLine1;
    }
    if (address.addressLine2 !== '') {
        data.addressline2 = address.addressLine2;
    }
    if (address.postcode !== '') {
        data.postcode = address.postcode;
    }
    if (address.city !== '') {
        data.city = address.city;
    }
    if (address.district !== '') {
        data.district = address.district;
    }
    if (address.countryName !== '') {
        data.country_name = address.countryName;
    }

    return data;
}

module.exports = buildSearchQuery;