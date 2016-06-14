import $ from './jquery-3.0.0.min.js';
import io from 'socket.io-client';

export class ConnectSockets {
	constructor(user) {
		this.socket = io.connect('http://localhost:3000');
		this.user = user;
	}

	sendMessage(message) {
		if (message.message.length < 1) {
			return false;
		}

		this.socket.emit('chat message', message);
		$('form').trigger('reset');
	}

	showTyping() {
		this.socket.emit('typing', this.user);
	}
}
