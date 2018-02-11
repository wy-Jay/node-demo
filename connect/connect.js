var connect = require('connect');
var router = require('./middleware/router');

var app = connect();

function logger(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
}


function hello(req, res){
  res.setHeader('Content-Type', 'text/plain');
  res.end('url:' + req.url)
}

function restrict(req, res, next){
  console.log('restrict')
  var authorization = req.headers.authorization;
  if(!authorization) return next(new Error('Unauthorized'));
  var parts = authorization.split(' ')
  var scheme = parts[0];
  var auth = new Buffer(parts[1], 'base64').toString().split(':')
  var user = auth[0];
  var pass = auth[1];
  authenticateWithDataBase(user, pass, function(err){
    if(err) return next(err);
    next()
  })
}

function admin(req, res, next){
  switch (req.url) {
    case '/':
      res.end('try /users');
      break;
    case '/users' :
      res.setHeader('content-Type', 'application/json');
      res.end(JSON.stringify(['tobi','loki','jane']));
      break;
  }
  next()
}

function setup(format) {
  var regexp = /:(\w+)/g
  return function(req, res, next){
    var str = format.replace(regexp, function(match, property){
      return req[property]
    })
    console.log(str)
    next()
  }
}

app
  .use(logger)
  // .use('/admin', restrict)
  // .use('/admin1', admin)
  .use(setup({some : 'options'}))
  .use(hello).listen(3000)