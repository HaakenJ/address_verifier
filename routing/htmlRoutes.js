const db = require("../models");
const path = require("path");


// this module specifies the urls for the different html pages and 
// where those files are located.  This app only has an index located
// at the / url.  Everything else gets a 404 not found status
module.exports = function(app) {
  // Load index page
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.status("404");
  });
};
