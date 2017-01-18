var winston = require("winston");
var io = require('socket.io')(require("../http").http);


io.on('connection', function(socket) {
  winston.info('a user connected');
  socket.on('disconnect', function() {
    winston.info('user disconnected');
  });

  socket.on('mousemove', function(data) {
    socket.broadcast.emit('moving', data);
  });


  socket.on('chat', function(data) {
    winston.info('[chat] ' + data.name + ": " + data.message);
    if(data.message.charAt(0) == "/" && data.message.charAt(1) == "]") {
      // 			socket.broadcast.emit('sudo', data.message.substr(2));
    } else {
      io.emit('chat', data);
    }
  });
});
