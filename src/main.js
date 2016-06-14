import $ from './js/jquery-3.0.0.min.js';
import io from 'socket.io-client';
import {User} from './js/user.js';
import {ConnectSockets} from './js/connectSockets.js';

let newUser = new User();
let user = newUser.getUser();
let sockets = new ConnectSockets(user);
let socket = io.connect('http://localhost:3000');

$('html').on('click', function() {
	$('#message').focus();
});

$('form').submit(function(form) {
	form.preventDefault();

	let message = {
		user: user,
		message: $('#message').val().trim()
	};

	sockets.sendMessage(message);
});

$('form').on('keypress', function() {
	sockets.showTyping();
});

setInterval(function() {
	if ($('#typing').text === '') {
		return;
	}
	$('#typing').text('');
}, 1000);


socket.on('connect', function(msg) {
	socket.emit('join', user);
	socket.emit('user connected', user);
});

socket.on('disconnect', function(msg) {
	$('#messages').append($('<li>').text(msg.user + ' has disconnected.'));
	$('#online').empty();

	msg.clients.forEach(function(client) {
		$('#online').append($('<li class="online">').text(client));
	});

	$('html, body').animate({scrollTop: $('#messages').height()}, 'slow');
});

socket.on('chat message', function(msg) {
	$('#messages').append($('<li>').text(msg.user + ': ' + msg.message));
	$('html, body').animate({ scrollTop: $('#messages').height()}, 'slow');
});

socket.on('user connected', function(msg) {
	$('#messages').append($('<li>').text(msg.connected));
	$('html, body').animate({ scrollTop: $('#messages').height()}, 'slow');
	$('#online').empty();

	msg.clients.forEach(function(client) {
		$('#online').append($('<li class="online">').text(client));
	});
});

socket.on('typing', function(msg) {
	$('#typing').text(msg);
});
