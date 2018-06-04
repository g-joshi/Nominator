const express = require('express');
const bodyParser = require('body-parser');
// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// create express app
const app = express(),
  	  port = process.env.PORT || 3000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Nomination tool application. Manage and keep track of all your nominations."});
});

// Require User routes
require('./api/routes/user.routes.js')(app);
// Require Nomination routes
require('./api/routes/nomination.routes.js')(app);

app.listen(port);

console.log('nomination tool RESTful API server started on: ' + port);
