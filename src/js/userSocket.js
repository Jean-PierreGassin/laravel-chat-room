import io from 'socket.io-client';

export class UserSocket {
	// Setup socket.io for websockets and construct our user
	constructor(user) {
		this.socket = io.connect({path: '/node/socket.io'});
		this.user = user;
	}

	// Emit a 'chat message' event to the room for users to receive
	sendMessage(message) {
		if (message.message.length < 1) {
			return false;
		}

		this.socket.emit('chat message', message);
	}

	// Emite a 'typing' event to the room for users to receive
	showUserTyping() {
		this.socket.emit('typing', this.user);
	}

	get theSocket() {
		return this.socket;
	}
}
