var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/css/:name', function(req, res) {
  res.sendFile(__dirname + '/client/css/' + req.params.name);
});

app.get('/js/:name', function(req, res) {
  res.sendFile(__dirname + '/client/js/' + req.params.name);
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('mousemove', function(data) {
    socket.broadcast.emit('moving', data);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
