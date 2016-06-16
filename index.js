var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http, {path: '/node/socket.io'});
var messageLog = [];
var clients = [];

io.on('connection', function(socket) {
	if (messageLog.length > 50) {
		messageLog.shift();
	}

	socket.on('join', function (name) {
			socket.name = name;
			clients.push(name);

			io.emit('message log', messageLog);
			console.log(socket.name + ' joined the chat.');
	});

	socket.on('user connected', function(user) {
		var response = {
			connected: user + ' has connected.',
			clients: clients
		};

		var message = {
			user: user,
			message: ' has connected.'
		};

		io.emit('user connected', response);
		messageLog.push(message);
	});

	socket.on('typing', function(user) {
		var message = user  + ' is currently typing...';

		socket.broadcast.emit('typing', message);
	});

	socket.on('chat message', function(message) {
		if (messageLog.length > 50) {
			messageLog.shift();
		}

		io.emit('chat message', message);
		messageLog.push(message);
	});

	socket.on('disconnect', function() {
		clients.splice(clients.indexOf(socket.name), 1);

		var response = {
			user: socket.name,
			clients: clients
		};

		var message = {
			user: socket.name,
			message: ' has connected.'
		};

		io.emit('disconnect', response);
		messageLog.push(message);
		console.log(socket.name + ' disconnected from the chat.');
	});
});

http.listen(3000);
