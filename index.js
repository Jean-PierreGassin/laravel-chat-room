var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http, {path: '/node/socket.io'});
var messageLog = [];
var messages = [];
var clients = [];

io.on('connection', function(socket) {
	socket.on('join', function (name) {
			socket.name = name;
			clients.push(name);

			messages.forEach(function(message) {
				if (messages.length >= 20) {
						messageLog.push(message);
				}
			});

			io.emit('message log', messageLog);

			console.log(socket.name + ' joined the chat.');
	});

	socket.on('user connected', function(msg) {
		var message = {
			connected: msg + ' has connected.',
			clients: clients
		};

		io.emit('user connected', message);
	});

	socket.on('typing', function(msg) {
		var message = msg  + ' is currently typing...';

		socket.broadcast.emit('typing', message);
	});

	socket.on('chat message', function(msg) {
		if (messageLog.length >= 20) {
			messageLog.shift();
		}

		io.emit('chat message', msg);
		messages.push(
			{
				"name": socket.name,
				"message": msg
			}
		);
	});

	socket.on('disconnect', function() {
		clients.splice(clients.indexOf(socket.name), 1);

		var message = {
			user: socket.name,
			clients: clients
		};

		io.emit('disconnect', message);
	});
});

http.listen(3000);
