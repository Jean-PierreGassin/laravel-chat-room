$(document).foundation();

var chatRoom = {
	settings: {

	},

	init: function() {
		$.get("http://chatroom.localhost/messages", function(data) {
			console.log(data);
		});
	}
};

$(document).ready(function() {
	chatRoom.init();
}());
