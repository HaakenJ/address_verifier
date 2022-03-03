/**
 * This is the file where we wil define our database models.
 * Each table has it's own model and this maps the data we receive from
 * the database into the proper datatypes.
 */

const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const countries = sequelize.define('countries', {
        id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        districtLabel: DataTypes.STRING
    })
}

// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const countries = sequelize.define('userdata', {
//     ipAddress: DataTypes.STRING,
//     devType: DataTypes.STRING,
//     vendor: DataTypes.STRING,
//     model: DataTypes.STRING,
//     cpu: DataTypes.STRING,
//     cores: DataTypes.INTEGER,
//     screenHeight: DataTypes.INTEGER,
//     screenWidth: DataTypes.INTEGER,
//     os: DataTypes.STRING,
//     browser: DataTypes.STRING,
//     country: DataTypes.STRING,
//     city: DataTypes.STRING,
//     square: DataTypes.BOOLEAN,
//     instagram: DataTypes.BOOLEAN,
//     twitter: DataTypes.BOOLEAN,
//     facebook: DataTypes.BOOLEAN,
//     google: DataTypes.BOOLEAN,
//     googlePlus: DataTypes.BOOLEAN,
//     skype: DataTypes.BOOLEAN,
//     spotify: DataTypes.BOOLEAN,
//     reddit: DataTypes.BOOLEAN,
//     tumblr: DataTypes.BOOLEAN,
//     expedia: DataTypes.BOOLEAN,
//     dropbox: DataTypes.BOOLEAN,
//     amazon: DataTypes.BOOLEAN,
//     pinterest: DataTypes.BOOLEAN,
//     netflix: DataTypes.BOOLEAN,
//     foursquare: DataTypes.BOOLEAN,
//     battleNet: DataTypes.BOOLEAN,
//     steam: DataTypes.BOOLEAN,
//     stackOverflow: DataTypes.BOOLEAN,
//     blogger: DataTypes.BOOLEAN
//   }, {});
//   userdata.associate = function(models) {
//     // associations can be defined here
//   };
//   return userdata;
// };