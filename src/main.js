import $ from './js/jquery-3.0.0.min.js';
import io from 'socket.io-client';
import {User} from './js/user.js';
import {UserSocket} from './js/userSocket.js';

let user = new User();
let userSocket = new UserSocket(user.name);
let socket = io.connect('http://localhost:3000');

// Re-focus the message box
$('html').on('click', function() {
	$('#message').focus();
});

// Emit the users message to socket.io
$('form').submit(function(form) {
	form.preventDefault();

	let message = {
		user: user.name,
		message: $('#message').val().trim()
	};

	userSocket.sendMessage(message);
	$('form').trigger('reset');
});

// Emit the users 'typing' event to the server
$('form').on('keypress', function() {
	userSocket.showUserTyping();
});

// Reset the typing div every second to show real-time actions
setInterval(function() {
	if ($('#typing').text === '') {
		return;
	}
	$('#typing').text('');
}, 1000);

// When a user connects, join the room and emit the 'connect' event to the server
socket.on('connect', function(msg) {
	socket.emit('join', user.name);
	socket.emit('user connected', user.name);
});

// When a user connects, emit the 'user connected', join the room
// and add them to the online list
socket.on('user connected', function(msg) {
	$('#messages').append($('<li>').text(msg.connected));
	$('html, body').animate({ scrollTop: $('#messages').height()}, 'slow');
	$('#online').empty();

	msg.clients.forEach(function(client) {
		$('#online').append($('<li class="online">').text(client));
	});
});

// When a 'typing' event is received from socket.io, let the client know
socket.on('typing', function(msg) {
	$('#typing').text(msg);
});

// When a 'chat' event is received, update the clients chat box
socket.on('chat message', function(msg) {
	$('#messages').append($('<li>').text(msg.user + ': ' + msg.message));
	$('html, body').animate({ scrollTop: $('#messages').height()}, 'slow');
});

// When a 'disconnect' event is received append it to the clients message box
socket.on('disconnect', function(msg) {
	$('#messages').append($('<li>').text(msg.user + ' has disconnected.'));
	$('#online').empty();

	msg.clients.forEach(function(client) {
		$('#online').append($('<li class="online">').text(client));
	});

	$('html, body').animate({scrollTop: $('#messages').height()}, 'slow');
});
