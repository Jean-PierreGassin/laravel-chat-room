export class User {
	// If the client is a Firefox user let everyone know
	constructor() {
		this.isFirefox = typeof InstallTrigger !== 'undefined';

		if (this.isFirefox) {
			this.user = 'Firefox User';
		}
	}

	// Ask for the clients name
	promptName() {
		if (!this.isFirefox) {
			do {
				this.user = prompt('What\'s your name?');
			} while (this.user === null || this.user.length <= 1);
		}

		this.user.trim();

		return this.user;
	}

	get name() {
		return this.user || this.promptName();
	}
}
