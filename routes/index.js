var express = require('express');
var shelljs = require('shelljs/global');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	if (exec('mkdir test').code !== 0) {
	  var result = 'Error: mkdir failed';
	  exit(1);
	} else {
		result = 'Success!';
	};
	res.render('index', { title: result });
});

module.exports = router;