var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass(
		'app.scss',
		'public/css',
		{
			includePaths: [
				'resources/assets/bower_components/foundation-sites/scss',
			]
		}
	);

	mix.scripts('app.js');

	mix.scripts(
		['jquery/dist/jquery.js', 'foundation-sites/dist/foundation.js'],
        'public/js/vendor.js',
        'resources/assets/bower_components/'
	);
});
