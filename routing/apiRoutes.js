const { sequelize } = require("../models");
const db = require("../models");
const { Sequelize, Op } = require("sequelize");

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
    var inputStr = req.query.input;
    //parse for country name in case client wants to narrow down results
    var countryName = req.query.country_name;

    models.findAll({
      where: {
        [Op.or]: [
          {addressline1: { [Op.substring]: inputStr} }, 
          {addressline2: { [Op.substring]: inputStr} }
        ]
      }
    }).then(
       result => { 
         //Filter down the result if a country name is provided
        if(countryName){
          var finalResult = [];
          for(var i = 0; i < result.length; i++){
            if(result[i].country_name === countryName){
              finalResult.push(result[i]);
            }
          }
          result = finalResult;
        }
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
      attributes: [db.sequelize.fn('DISTINCT', db.sequelize.col('addressline1')), 'country_name', 'district'], where: { district : name }
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

  // get city by name
  app.get('/api/cities/name', (req, res) => {
    var name = req.query.name;



    res.json(result);
  })


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
  }) 

  // get all postcodes by all cities
  app.get('/api/postcodes/city', (req, res) => {
    var name = req.query.city;


    models.findAll(
      { 
        attributes: [db.sequelize.fn('DISTINCT', db.sequelize.col('postcode')) ,'city', 'district_type'],
        where: {city: name}
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
  }) 

  // get all matching addresses to the address passed in
  app.get('/api/matches', (req, res) => {
    var countryName = req.query.country_name;
    var dis = req.query.district;
    var cityName = req.query.city;
    var pcode = req.query.postcode;
    var address1 = req.query.address1;
    var address2 = req.query.address2;

    //console.log(country + " " + district + " " + "city");

    models.findAll({
      where: {
        //Give them some leeway for address inputs
        addressline1: { [Op.substring]: address1 },
        //addressline2: { [Op.substring]: address2 },
        postcode: pcode,
        city: cityName,
        district: dis,

        //Also some room for country name
        country_name: { [Op.substring] : countryName }
      }
    }).then (
      result => { res.json(result); }
    ).catch(
      err => {
        console.error("error getting countries:", err);
        res.status(500);
        res.send('Server error getting addresses for given parameters');
      }
    )
  });

  // // post method, has the parameters of the path for calling it and a callback function
  // // the callback has a request and a response
  // // the req has a body of parameters we can access we send back the res
  // app.post("/api/userData", (req, res) => {
  //   console.log(req.body);
  //   // this is calling a sequelize repository function to create data
  //   // .then means that once the create method is done, do this next function
  //   // => is shorthand for creating an anonymous function
  //   // the .then method receives the result of the creation (dbuserdata)
  //   // and adds it to the response as json
  //   db.userdata.create(req.body).then(dbuserdata => {
  //     res.json(dbuserdata);
  //   });
  // });

  // // get method that calls the findAll repository method
  // // check sequelize docs for explanation of findAll
  // app.get("/api/devtype", (req, res) => {
  //   db.tablename.findAll({
  //     attributes: ["devType", [db.sequelize.fn("COUNT", db.sequelize.col("devType")), "no_devType"]],
  //     group: ["devType"]
  //   }).then(result => {
  //     res.json(result);
  //   });
  // });

  // app.get("/api/browser", (req, res) => {
  //   db.userdata.findAll({
  //     attributes: ["devType", "browser", [db.sequelize.fn("COUNT", db.sequelize.col("browser")), "no_browser"]],
  //     where: {devType: "PC"},
  //     group: ["browser"]
  //   }).then(pcBrowsers => {
  //     db.userdata.findAll({
  //       attributes: ["devType", "browser", [db.sequelize.fn("COUNT", db.sequelize.col("browser")), "no_browser"]],
  //       where: {devType: "tablet"},
  //       group: ["browser"]
  //     }).then(tabBrowsers => {
  //       db.userdata.findAll({
  //         attributes: ["devType", "browser", [db.sequelize.fn("COUNT", db.sequelize.col("browser")), "no_browser"]],
  //         where: {devType: "mobile"},
  //         group: ["browser"]
  //       }).then(mobBrowsers => {
  //         let response = {
  //           pcBrowsers: pcBrowsers,
  //           tabBrowsers: tabBrowsers,
  //           mobBrowsers: mobBrowsers
  //         };
  //         res.json(response);
  //       });
  //     });
  //   });
  // });

  // app.get("/api/location", (req, res) => {
  //   db.userdata.findAll({
  //     attributes: ["country", [db.sequelize.fn("COUNT", db.sequelize.col("country")), "no_country"]],
  //     group: ["country"]
  //   }).then(countryInfo => {
  //     res.json(countryInfo);
  //   });
  // });

  // app.get("/api/mapKey", (req, res) => {
  //   const key = process.env.MAPS_KEY;
  //   res.json(key);
  // })
};
