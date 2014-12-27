var express = require('express');	
 	app = module.exports = express(),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	flash = require('connect-flash');

mongoose.connect('mongodb://localhost/myapp', function(err){
	// console.log() or throw Error() if err
});

/*!
 * App Config
 */
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

/*!
 * App Middleware
 */
app.use(bodyParser());
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(morgan('dev'));

/*!
 * Development Config
 */

/*!
 * Production Config
 */

/*!
 * Routing
 */
app.get('/', function(req, res, next){
	res.render('master.jade', {
		title: 'Home'
	})
});

/*!
 * Start Server
 */
app.listen(app.get('port'), function(){
	console.log('Listening on port ' + app.get('port'));
});
