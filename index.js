var express = require('express');	
	 	app = module.exports = express(),
		morgan = require('morgan'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		flash = require('connect-flash'),
		passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy;



/*!
 * App Config
 */
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

/*!
 * External Middleware
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
 * passport Config
 */
passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({ username: username }, function(err, user){
			if(err){ 
				return done(err); 
			}
			if(!user){
				return done(null, false, { message: 'Incorrect username.' });
			}
			user.comparePassword(password, function(err, isMatch){
				if(!isMatch) {
					return done(null, false, { message: 'Incorrect password.' });
				} else {
					return done(null, user);
				}
			});
		});
	}));

/*!
 * Routing
 */
var authRoutes = require('./routers/auth');
var adminRoutes = require('./routers/admin');

app.get('/', function(req, res, next){
	res.render('master.jade', {
		title: 'Home'
	});
});

app.use('/', authRoutes);
app.use('/admin', adminRoutes);

/*!
 * Start Server
 */
app.listen(app.get('port'), function(){
	console.log('Listening on port ' + app.get('port'));
});
