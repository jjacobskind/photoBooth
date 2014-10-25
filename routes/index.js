var express = require('express');
var shelljs = require('shelljs/global');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var content = 'this is the test content'
	res.render('index', {title: content});
});

module.exports = router;