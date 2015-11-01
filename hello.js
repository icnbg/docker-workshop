var express = require('express');
var morgan = require('morgan')

var PORT = process.env.EXPOSE_PORT;

var app = express();
app.use(morgan('combined'))
app.get('/', function (req, res) {
  res.send('Hello IT Varna\n');
});

app.listen(PORT);
console.log('Hosted by ICN.BG Apps platform on: ' + PORT);
