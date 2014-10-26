var hue = require('../lib/hue-node');
var test_constants = require('../lib/hue-test-constants');

//initial config
hue.setConfig({
	ip: "0.0.0.0",
	key: "9cf5fd0c39b5845d0b8099e9c0daf2cd"
});

var cameraFlash = hue.flash(1);

var backgroundColor = {
	on: function(color) {
		if (!!color) {color = 'white'};
		hue.setColor(1, color);
		hue.turnOn();
	},
	off: function() {
		hue.turnOff();
	}
};

module.exports = {
	'light': light
};

