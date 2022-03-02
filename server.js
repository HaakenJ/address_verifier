// this package controlls environment variables such as api keys 
// that we don't want to be public on github
require("dotenv").config();
// express is the api we will use for managing the server
var express = require("express");


// our database models are contained in this variable
var db = require("./models");

// initialize our application on port 3000 unless there is an environment
// variable declared for the port, as would be the case when it is being
// cloud hosted on heroku or something
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware to declare we're using json and our static files are in the
// public directory
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));

// Routes - our route modules
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

// shrug
var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/'
// this is where the server starts
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;