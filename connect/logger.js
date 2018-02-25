var connect = require('connect');
var logger = require('morgan');

var hello = function(req, res, next){
  res.end('hello')
}

var app = connect()
  .use(logger())
  .use(hello)
  .listen(3000)