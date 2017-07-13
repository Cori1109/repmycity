let express = require('express');
let app = express();
let logger = require('morgan');
let cors = require('cors');
let bodyParser = require('body-parser');
let shopify = require('./routes/shopify');
let upload = require('./routes/upload');
require('dotenv').config();

// Enable CORS
// var whitelist = ['http://localhost', 'http://example2.com'];
// var corsOptions = {
//   origin: function (origin, callback) {
//     console.log('origin: ', origin);
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS. origin: ' + origin));
//     }
//   }
// }
//

// Set port
app.set('port', (process.env.PORT || 5000));

// Set static folder
app.use(express.static(__dirname + '/public'));

// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

app.use(bodyParser.json());

// Shopify routes
app.use('/shopify', shopify);

// Upload routes
app.use('/upload', upload);

// Serve the index file
app.get('*', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// Listen to port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
