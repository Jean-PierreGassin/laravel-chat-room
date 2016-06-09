$(document).foundation();

var chatRoom = {
	settings: {

	},

	create: function() {
		var info = {
			user: 'Jean-Pierre',
			message: 'Test message'
		};

		var data = JSON.stringify(info);

		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});

		$.post("http://chatroom.localhost/messages", function(data) {
			console.log(data);
		});
	},

	init: function() {
		$.get("http://chatroom.localhost/messages", function(data) {
			console.log(data);
		});
	}
};

$(document).ready(function() {
	chatRoom.create();
}());
