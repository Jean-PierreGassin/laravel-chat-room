<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="csrf-token" content="{{ csrf_token() }}" />
	<title>Chat Room</title>
	<link rel="stylesheet" href="css/app.css"/>
</head>
<body>
	<div class="row">
		<div class="columns">
			<h5>Who's online?</h5>
		</div>

		<div class="medium-8 columns">
			<div class="message-area">
				test
			</div>

			<form>
			  <div class="row">
			    <div class="input-group">
			        <textarea placeholder="Start chattin'..."></textarea>
					<input type="submit" class="button" value="Send">
			    </div>
			  </div>
			</form>
		</div>
	</div>
</body>
<script src="js/vendor.js"></script>
<script src="js/app.js"></script>
</html>
