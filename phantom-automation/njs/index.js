var fs = require('fs');
var https = require('https');
var express = require('express');
var app = express();


//var cors = require('cors');
//app.use(cors());
//app.options('*', cors());

var allowCrossDomain = function(res, path, stat) {
  
    res.setHeader('Access-Control-Allow-Origin', 'https://api.pinterest.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

app.use(express.static('static', {etag:true, lastModified:true, maxAge: '5s', setHeaders: allowCrossDomain } ));

//app.get('/', function (req, res) { res.send('Hello World') });

const options = {
  key: fs.readFileSync('./ssl/cert.key'),
  cert: fs.readFileSync('./ssl/cert.crt')
};

https.createServer(options, app).listen(443);

console.log('started at https://localhost:443');
