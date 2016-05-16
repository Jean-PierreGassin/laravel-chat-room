<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
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
				<input type="hidden" name="_token" id="csrf-token" value="{{ Session::token() }}" />
			    <div class="input-group">
			        <textarea placeholder="Start chattin'..."></textarea>
					<input type="submit" class="button" value="Send">
			    </div>
			  </div>
			</form>
		</div>
	</div>
</body>
<script src="js/app.js"/>
</html>
