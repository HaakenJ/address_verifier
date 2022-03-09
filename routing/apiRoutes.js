const { sequelize } = require("../models");
const db = require("../models");
const { Sequelize, Op } = require("sequelize");
const buildSearchQuery = require('./routeUtils');

var models = db.address;

// This is where all the api methods will reside, at least the part that asks the repository
// for the data does any necessary procesing before responding with the data

// this exports the functions to the server
module.exports = function(app) {

  // get all distinct country names
  app.get('/api/countries', (req, res) => {
    models.findAll(
      { 
        attributes: [db.sequelize.fn('DISTINCT', db.sequelize.col('country_name')) ,'country_name', 'district_type']
      }).then(
      result => {
        res.json(result);
      }
    ).catch(
      err => {
        console.error("error getting countries:", err);
        res.status(500);
        res.send('Server error getting countries');
      }
    )
  });

  // get districts by country name - param key is 'country'
  //TODO: check if we need to return the country name along with each district result
  app.get('/api/districts/country', (req, res) => {
    var name = req.query.name;

    models.findAll({
      attributes: [ [db.sequelize.fn('DISTINCT', db.sequelize.col('district')) , 'district'], 'country_name'], where: { country_name: name}
    }).then(
      result => { res.json(result); }
    ).catch(
      err => {
        console.error("error getting countries:", err);
        res.status(500);
        res.send('Server error getting countries');
      }
    )
  });

  // get all addresses given partial inputs
  // params: 'input', 'country_name'
  app.get('/api/addresses/find', (req, res) => {
    // var inputStr = req.query.input;
    // //parse for country name in case client wants to narrow down results
    // var countryName = req.query.country_name;

    var input = req.query;

    models.findAll({
      where: {
          addressline1: { [Op.substring]: input.addressLine1} , 
          addressline2: { [Op.substring]: input.addressLine2} ,
          postcode: { [Op.substring]: input.postcode} ,
          city: { [Op.substring]: input.city} ,
          district: { [Op.substring]: input.district} ,
          country_name: { [Op.substring]: input.countryName}
      }
    }).then(
       result => { 
         //Filter down the result if a country name is provided
        // if(countryName){
        //   var finalResult = [];
        //   for(var i = 0; i < result.length; i++){
        //     if(result[i].country_name === countryName){
        //       finalResult.push(result[i]);
        //     }
        //   }
        //   result = finalResult;
        // }
        res.json(result) }
    ).catch(
      err => {
        console.error("error getting addresses:", err);
        res.status(500);
        res.send('Could not find any matching addresses from the partial input');
      }
    )
  });


  // get address line by district name, return all matching addresses
  app.get('/api/addresses/1/district', (req, res) => {
    var name = req.query.name;

    models.findAll({
      attributes: [ [db.sequelize.fn('DISTINCT', db.sequelize.col('addressline1')), 'addressline1'], 'country_name', 'district'], where: { district : name }
    }).then (
      result => { res.json(result); }
    ).catch(
      err => {
        console.error("error getting districts: ", err);
        res.status(500);
        res.send("Server error: could not find the specified district");
      }
    )
  });

  // get cities by district
  app.get('/api/cities/district', (req, res) => {
    //Add option to include country name as well
    var districtName = req.query.name;

    models.findAll({
      attributes: [ [db.sequelize.fn('DISTINCT', db.sequelize.col('city')), 'city'], 'district'], where: {district: districtName}
    }).then (
      result => { res.json(result); }
    ).catch (
      err => {
        console.error("error getting cities: ", err);
        res.status(500);
        res.send("Server error: could not locate the cities for given district name");
      }
    )
  }); 

  // get city by name to let the client check if a city exists
  app.get('/api/cities/name', (req, res) => {
    var name = req.query.name;

    //TODO: how to properly let client know? it could just respond with empty string
    models.findOne({ 
      where: {
        city: { [Op.substring]: name}
      }
    }).then(
      result => { 
        //Check if the result is empty, if so then let the client know
        if(result.length === 0){
          res.status(400);
          res.send('Could not find any record with the provided city');
        }
        else{
          res.json(result);
        }
      }
    ).catch(
      err => {
        console.error("error getting cities: ", err);
        res.status(500);
        res.send("Server error retrieving data for the given argument(s)");
      }
    )
  });


  // get addresses line 1 by city
  //FIXME implementing as getting all addresses by city for now
  app.get('/api/addresses/1/city', (req, res) => {
    var cityName = req.query.name;

    //In case client also provides a country name
    var countryName = req.query.country_name;

    models.findAll({
      where: { city: { [Op.substring]: cityName } }
    }).then (
      result => {
        //Narrow down results when a country filter is given
        if(countryName){
          var finalResult = [];
          for(var i = 0; i < result.length; i++){
            if(result[i].country_name === countryName){
              finalResult.push(result[i]);
            }
          }
          result = finalResult;
        }
        res.json(result); }
    ).catch(
      err => {
        console.error("error getting cities: ", err);
        res.status(500);
        res.send("Server error: could not locate addresses for given city name");
      }
    )
  });

  // get addresses line 2 by city
  //TODO do we need this?? 
  app.get('/api/addresses/2/city', (req, res) => {
    var name = req.query.name;

    result = [
      {
        id: 1,
        name: 'APT 212'
      },
      {
        id: 2,
        name: 'BLDG 2'
      },
      {
        id: 3,
        name: 'STE 323'
      }
    ];

    res.json(result);
  }); 

  // get all postcodes for a given city
  app.get('/api/postcodes/city', (req, res) => {
    var name = req.query.name;


    models.findAll(
      { 
        attributes: [db.sequelize.fn('DISTINCT', db.sequelize.col('postcode')) ,'postcode'],
        where: {city: name}
      }).then(
      result => {
        res.json(result);
      }
    ).catch(
      err => {
        console.error("error getting postal codes:", err);
        res.status(500);
        res.send('Server error getting postal codes');
      }
    )
  }) 

  // get all matching addresses to the address passed in
  //TODO add input checks
  app.get('/api/matches', (req, res) => {
    var query = buildSearchQuery(req.query);

    models.findAll({
      where: query,
      limit: 20
    }).then (      
      result => { 
        res.json(result);
      }
    ).catch(
      err => {
        console.error("error getting countries:", err);
        res.status(500);
        res.send('Server error getting addresses for given parameters');
      }
    )
  });
}