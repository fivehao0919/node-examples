var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var dishes = require('./dishRouter');
var promotions = require('./promoRouter');
var leadership = require('./leaderRouter');


var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

dishes.setup(app);
promotions.setup(app);
leadership.setup(app);


app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server assignment running at http://${hostname}:${port}/`);
});
