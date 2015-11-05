var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var myip = require('quick-local-ip');

var port = process.env.EXPOSE_PORT;
var file_contents = fs.readFileSync(process.env.DEMO_FILE, 'utf8');

var app = express();
app.use(morgan('combined'))
app.get('/', function (req, res) {
  res.send(file_contents);
});

app.listen(port);
console.log('Hosted by ICN.BG Apps platform on: ' + myip.getLocalIP4() + ':' + port);
