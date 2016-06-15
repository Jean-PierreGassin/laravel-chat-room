var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clients = [];

app.use(express.static('public'));

io.on('connection', function(socket){
	socket.on('join', function (name) {
			socket.name = name;
			clients.push(name);

			console.log(socket.name + ' joined the chat.');
	});

	socket.on('user connected', function(msg){
		var message = {
			connected: msg + ' has connected.',
			clients: clients
		};

		io.emit('user connected', message);
	});

	socket.on('typing', function(msg){
		var message = msg  + ' is currently typing...';

		socket.broadcast.emit('typing', message);
	});

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function(){
		clients.splice(clients.indexOf(socket.name), 1);

		var message = {
			user: socket.name,
			clients: clients
		};

		io.emit('disconnect', message);
	});
});

http.listen(3000);
