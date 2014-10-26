var mraa_touch = require("mraa");
var shelljs = require('shelljs/global');
var http = require('http');

//REMEMBER TO INSTALL MODULES BEFORE RUNNING!!!!!!!!!

//callback to setInterval that checks whether the touchpad is currently being touched
var readTouch = function () {
    var cur_check = touch.read();
    if(cur_check && !last_check) {
        console.log("Touched!");//takePic();
        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/new_pic/' + pic_name,
            method: 'GET'
        }

        var request = http.request(options, function(res) {});
        request.end();
        }
    last_check = cur_check;
};


// Runs when the touchpad is touched
// Runs command line code to take a picture
var takePic = function() {
    var whatval = exec('mkdir hey').code;   //need to substitute in command line code to take pic
    if(whatval!==0) {
        console.log("Failure!");
    } else {
        console.log("Success");
    }
};

// After picture is taken/saved, makes an http request to server 
// to alert that picture is ready to be tweeted
var notifyServer = function(pic_name) {
    var client = http.createClient(3000, 'localhost');
    var request = client.request('GET', '/new_pic');
    request.write(pic_name);
    request.end();
    request.on("response", function (response) {    //IF THERE ARE DELETION ISSUES, CHECK THAT THIS ISN'T EFFING UP
        exec('rm ' + response);      //SERVER NEEDS TO RETURN THE NAME OF THE PICTURE FILE!
    });
};


var touch = new mraa_touch.Gpio(8);
touch.dir(mraa_touch.DIR_IN);

var last_check = false;
setInterval(readTouch, 1);