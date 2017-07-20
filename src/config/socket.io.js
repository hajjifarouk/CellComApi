module.exports = function(app, server) {
	var socketIO = require('socket.io').listen(server);
	global.socketIO = socketIO;

	socketIO.set("transports", ["polling","websocket"]);
	socketIO.sockets.on('connection', function (socket) {
		console.log("socket connected "+socket.id);
		socket.emit('message',"this is a message");
	  socket.on('disconnect', function () {
		  console.log("socket disconnected");
	  });

	});

}