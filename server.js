var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




//
//
// const path = require('path');
// var express = require('express');
//
// // Create our app
// var app = express();
// const PORT = process.env.PORT || 3000;
//
// app.use(function (req, res, next){
//   if (req.headers['x-forwarded-proto'] === 'https') {
//     res.redirect('http://' + req.hostname + req.url);
//   } else {
//     next();
//   }
// });
//
// app.use(express.static(path.join(__dirname, 'public')));
//
// // app.get('/shopify', (req, res) => {
// //   axios.get('https://3f65ac6bcc5e4bb064776dc47b464c8f:326d1ba3916b9c719a848c9a9999fa5c@rmc-preview.myshopify.com/admin/orders.json').then((data) => {
// //     // Respond to the express call
// //     res.json(data);
// //     // console.log(data);
// //   });
// // });
//
// app.get('*', function(req, res) {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });
//
// app.listen(PORT, function () {
//   console.log('Express server is up on port ' + PORT);
// });
