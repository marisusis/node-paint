var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/:name', function(req, res) {
  res.sendFile(__dirname + '/'+req.params.name);
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  
  socket.on('mousemove',function (data) {
    socket.broadcast.emit('moving',data);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});