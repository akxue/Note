/* Set up router */
const express = require('express');
const router = express.Router();
const assert = require('assert');
require('colors')
var jsdiff = require('./public/diff.js');

var user1content = "";
var user2content = "";
var user1 = 0;
var user2 = 0;
var user1post = "";
var user2post = "";

/* Configure router to log */
router.use(function(req, res, next){
	console.log(req.method);
	next();
});

router.get('/', function(req, res){
	res.sendFile(__dirname + "/public/no2e.html")
});

router.get('/users', function(req, res){
	console.log(user1);
	console.log(user2);
});

router.get('/strings', function(req, res){
	console.log(user1content);
	console.log(user2content);
});

router.post('/user', function(req, res){
	if (user1 == 0){
	 	user1 = req.body.id;
		user1post = "/" + user1;
		console.log(user1post);
	} else if (user2 == 0){
		user2 = req.body.id;
	}
	console.log(req.body);
});

router.post('/', function(req, res){
	var diff;

	if (req.body.id == user1){
		user1content = req.body.contents;
		diff = makeDiff(user2content, user1content);
	} else if (req.body.id == user2){
		user2content = req.body.contents;
		diff = makeDiff(user1content, user2content);
	}

	console.log(req.body.contents);
	res.send(diff);
});

function makeDiff(string1, string2){
//here we would want to ideally set one and other to whatever is in the notepads
	var one = string1;
	var other = string2;

	var diff = jsdiff.diffWords(one, other);

	return diff;
}

module.exports = router;
