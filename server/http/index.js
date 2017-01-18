var app = require('express')();
var http = require('http').Server(app);

var winston = require('winston');
var path = require('path');
var Q = require('q');

var APP_ROOT = path.resolve(__dirname, "../../");

app.get('/', function(req, res) {
  res.sendFile(APP_ROOT + '/client/index.html');
});

app.get('/css/:name', function(req, res) {
  res.sendFile(APP_ROOT + '/client/css/' + req.params.name);
});

app.get('/js/:name', function(req, res) {
  res.sendFile(APP_ROOT + '/client/js/' + req.params.name);
});

app.get('/tones/*', function(req, res) {
  res.sendFile(APP_ROOT + '/client/sounds/tones/' + req.params[0]);
});


// TODO: Move socket server into a sepera te server folder, and run on separate port
module.exports = {
  start: function(port = 8080) {
    winston.info("Loading HTTP server...");


    http.listen(port, function() {
      winston.info("http server listening on *:" + port);
    });
  },
  app: app,
  http: http
}