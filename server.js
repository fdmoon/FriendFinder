// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var friends = require("./app/data/friends.js");

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("[server.js] App listening on PORT " + PORT);
});

