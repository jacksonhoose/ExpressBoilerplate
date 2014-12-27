var router = module.exports = require('express').Router(),
	User = require('../models/user');

/*!
 * Login
 */
router.route('/login')
	.get(function(req, res, next){
		res.render('auth/login.jade', {
			title: 'Login'
		});
	})
	.post(function(req, res, next){

	});

/*!
 * Register
 */
router.route('/register')
	.get(function(req, res, next){
		res.render('auth/register.jade', {
			title: 'Register'
		});
	})
	.post(function(req, res, next){

	});

/*!
 * Logout
 */
router.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/');
});