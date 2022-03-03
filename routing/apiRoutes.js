const { sequelize } = require("../models");
const db = require("../models");

// This is where all the api methods will reside, at least the part that asks the repository
// for the data does any necessary procesing before responding with the data

// this exports the functions to the server
module.exports = function(app) {

  // get all countries
  app.get('/api/countries', (req, res) => {
    result = [
      {
        id: 1,
        name: 'USA',
        districtLabel: 'state'
      },
      {
        id: 2,
        name: 'Brazil',
        districtLabel: 'state'
      },
      {
        id: 3,
        name: 'South Korea',
        districtLabel: 'district'
      }
    ];

    res.json(result);
  });

  // get districts by country id
  app.get('/api/districts/countryId', (req, res) => {
    var id = req.query.countryId;

    var result = [
      {
        id: 1,
        name: 'washington'
      },
      {
        id: 2,
        name: 'oregon'
      },
      {
        id: 3,
        name: 'california'
      }
    ];

    res.json(result);
  })

  // get district by name
  app.get('/api/districts/name', (req, res) => {
    var name = req.query.name;

    var result = {
      id: 1,
      name: 'washington'
    };

    res.json(result);
  })

  // get cities by district id
  app.get('/api/cities/districtId', (req, res) => {
    var id = req.query.id;

    result = [
      {
        id: 1,
        name: 'seattle'
      },
      {
        id: 2,
        name: 'tacoma'
      },
      {
        id: 3,
        name: 'bellingham'
      }
    ];

    res.json(result);
  }) 

  // get city by name
  app.get('/api/cities/name', (req, res) => {
    var name = req.query.name;

    var result = {
      id: 1,
      name: 'seattle'
    };

    res.json(result);
  })

  // get addresses by city id
  app.get('/api/addresses/cityId', (req, res) => {
    var id = req.query.id;

    result = [
      {
        id: 1,
        name: '222 5th Ave N'
      },
      {
        id: 2,
        name: '1530 3rd Ave'
      },
      {
        id: 3,
        name: '5400 14th Ave NW'
      }
    ];

    res.json(result);
  }) 

  // get postcodes by city id
  app.get('/api/postcodes/cityId', (req, res) => {
    var id = req.query.id;

    result = [
      {
        id: 1,
        name: '98109'
      },
      {
        id: 2,
        name: '98101'
      },
      {
        id: 3,
        name: '98023'
      }
    ];

    res.json(result);
  }) 

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
