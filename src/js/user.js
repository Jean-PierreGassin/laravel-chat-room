export class User {
	constructor() {
		this.isFirefox = typeof InstallTrigger !== 'undefined';
		this.user = 'Firefox User';
	}

	getUser() {
		if (!this.isFirefox) {
			do {
				this.user = prompt('What\'s your name?');
			} while (this.user === null || this.user.length <= 1);
		}

		this.user.trim();

		return this.user;
	}
}
