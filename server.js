var http = require('http');
var uaParser = require('ua-parser-js');
var express = require('express');
var app = express();

var server = http.createServer(app);

app.use('/', function(req, res) {
    var ua = uaParser(req.headers['user-agent']);
    var whoami = {};
    whoami.ip = req.get('x-forwarded-for');
    whoami.lang = req.get('accept-language').split(',')[0];
    whoami.os = ua.os.name + ' ' + ua.os.version;
    res.end(JSON.stringify(whoami));
});

server.listen(8080, process.env.IP, function() {
    var addr = server.address();
    console.log('Server is listening on port: ' + addr.port);
})

