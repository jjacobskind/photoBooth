var express = require('express');
var router = express.Router();
var booth_data = require('../data/store').store;


/* GET users listing. */
router.post('/', function(req, res) {

	var twitter = req.body.twitter;
	var phone = req.body.number;

	console.log('submitted', twitter, phone, 'to queue')

	booth_data.addToQueue(twitter, phone)
	console.log('current queue:', booth_data.queue)
	res.render('submit', {twitter: twitter})
})

module.exports = router;
