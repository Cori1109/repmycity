var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


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
// app.get('*', function(req, res) {
//   response.render('public/index.html');
// });
//
// app.listen(PORT, function () {
//   console.log('Express server is up on port ' + PORT);
// });
