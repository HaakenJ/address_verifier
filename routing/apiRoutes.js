const db = require("../models");

// This is where all the api methods will reside, at least the part that asks the repository
// for the data does any necessary procesing before responding with the data

// this exports the functions to the server
module.exports = function(app) {
  // post method, has the parameters of the path for calling it and a callback function
  // the callback has a request and a response
  // the req has a body of parameters we can access we send back the res
  app.post("/api/userData", (req, res) => {
    console.log(req.body);
    // this is calling a sequelize repository function to create data
    // .then means that once the create method is done, do this next function
    // => is shorthand for creating an anonymous function
    // the .then method receives the result of the creation (dbuserdata)
    // and adds it to the response as json
    db.userdata.create(req.body).then(dbuserdata => {
      res.json(dbuserdata);
    });
  });

  // get method that calls the findAll repository method
  // check sequelize docs for explanation of findAll
  app.get("/api/devtype", (req, res) => {
    db.userdata.findAll({
      attributes: ["devType", [db.sequelize.fn("COUNT", db.sequelize.col("devType")), "no_devType"]],
      group: ["devType"]
    }).then(deviceTypes => {
      res.json(deviceTypes);
    });
  });

  app.get("/api/browser", (req, res) => {
    db.userdata.findAll({
      attributes: ["devType", "browser", [db.sequelize.fn("COUNT", db.sequelize.col("browser")), "no_browser"]],
      where: {devType: "PC"},
      group: ["browser"]
    }).then(pcBrowsers => {
      db.userdata.findAll({
        attributes: ["devType", "browser", [db.sequelize.fn("COUNT", db.sequelize.col("browser")), "no_browser"]],
        where: {devType: "tablet"},
        group: ["browser"]
      }).then(tabBrowsers => {
        db.userdata.findAll({
          attributes: ["devType", "browser", [db.sequelize.fn("COUNT", db.sequelize.col("browser")), "no_browser"]],
          where: {devType: "mobile"},
          group: ["browser"]
        }).then(mobBrowsers => {
          let response = {
            pcBrowsers: pcBrowsers,
            tabBrowsers: tabBrowsers,
            mobBrowsers: mobBrowsers
          };
          res.json(response);
        });
      });
    });
  });

  app.get("/api/location", (req, res) => {
    db.userdata.findAll({
      attributes: ["country", [db.sequelize.fn("COUNT", db.sequelize.col("country")), "no_country"]],
      group: ["country"]
    }).then(countryInfo => {
      res.json(countryInfo);
    });
  });

  app.get("/api/mapKey", (req, res) => {
    const key = process.env.MAPS_KEY;
    res.json(key);
  })
};
