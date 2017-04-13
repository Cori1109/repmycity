let express = require('express');
let app = express();
let logger = require('morgan');

// Set port
app.set('port', (process.env.PORT || 5000));

// Set static folder
app.use(express.static(__dirname + '/public'));

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

// Serve the index file
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Shopify routes
let shopify = require('./routes/shopify');
app.use('/shopify', shopify);

// Listen to port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
