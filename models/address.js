/**
 * This is the file where we wil define our database models.
 * Each table has it's own model and this maps the data we receive from
 * the database into the proper datatypes.
 */
'use strict'
// const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const address = sequelize.define('address', {
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true
        },
        addressLine1: DataTypes.STRING,
        addressLine2: DataTypes.STRING,
        postalCode: DataTypes.STRING,
        districtLabel: DataTypes.STRING,
        countryCode: DataTypes.STRING,
        countryName: DataTypes.STRING
    }, {});
    return address;
}

// console.log(address === sequelize.models.address);