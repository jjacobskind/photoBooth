var express = require('express');
var shelljs = require('shelljs/global');
var router = express.Router();
var twitterAPI = require('node-twitter-api');
var crypto = require('crypto');
var booth_data = require('../data/store').store;

/* GET home page. */
router.get('/', function(req, res) {
	var content = 'this is the test content';
	var queue = booth_data.queue.map(function(person) {
		return person.twitter;
	})
	res.render('index', {queue: queue});
});

router.get('/new_pic/:file_name', function(req, res) {
	var file_name = 'images/' + req.params.file_name;
	console.log(file_name);
	tweetPic(file_name);

	booth_data.removeFromQueue();

	var phone = booth_data.queue[0].phone;
	var name = booth_data.queue[0].twitter;

	exec('curl http://textbelt.com/text -d number=' +
		phone + ' -d "message=Hi, "' + name +
		'". It\'s your turn at the Photo Booth!"');

	console.log('Texting ' + name);

	res.redirect('/');
});


function tweetPic(file_name) {
	// Timestamp
	var curtime = parseInt(process.env.DEPLOY_TIMESTAMP || Date.now());

	// MUST UPDATE VARIABLES
	var oauth_consumer_key = '68NGJzG4GkjvQY51tWHR7m6d2';  //photo booth project key
	var oauth_consumer_secret = 'GEz5bbZhEZqpid36QiPfpxF4KQmaLdpCq8eoQuE4VTAIAkRvjW';
	var oauth_access_token = '2844456976-ymyJOPtsLqib25UqB4NCZ9Ayv1FFiIhNaHG9a9V';
	var oauth_access_secret = 'vLjkP0VM2Lpc5kgXqVVefwDPXnL9lQRpJ4vTpZk3okcTj';

	var twitter = new twitterAPI({
	    consumerKey: oauth_consumer_key,
	    consumerSecret: oauth_consumer_secret,
	    callback: 'http://yoururl.tld/something'
	});

	twitter.statuses("update_with_media", {
	        media: file_name,  
	        status: "Routed p!"
	    },
	    oauth_access_token,
	    oauth_access_secret,
	    function(error, data, response) {
	    	console.log("Data Before: " + booth_data.queue);
	    	booth_data.removeFromQueue();
	    	console.log("Data After: " + booth_data.queue);

	        if (error) {
	            console.log(error);
	            // something went wrong
	        } else {
	         console.log(data);
	            // data contains the data sent by twitter
	        }
	    });
};

module.exports = router;