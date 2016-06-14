export class User {
	// If the client is a Firefox user let everyone know
	constructor() {
		this.user = localStorage.getItem('user');
	}

	// Ask for the clients name
	promptName() {
		do {
			this.user = prompt('What\'s your name?');
			localStorage.setItem('user', this.user);
		} while (this.user === null || this.user.length <= 1);

		this.user.trim();

		return this.user;
	}

	get name() {
		return this.user || this.promptName();
	}
}
