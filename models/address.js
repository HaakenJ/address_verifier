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
        addressline1: DataTypes.STRING,
        addressline2: DataTypes.STRING,
        postcode: DataTypes.STRING,
        district: DataTypes.STRING,
        district_type: DataTypes.STRING,
        country_code: DataTypes.STRING,
        country_name: DataTypes.STRING
    }, 
    {
        timestamps: false
    }, {});
    return address;
}

// console.log(address === sequelize.models.address);