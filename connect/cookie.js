var connect = require('connect');
var app = connect()
  .use(connect.cookieParser('tobi is a cool ferret'))
  .use(function(req, res, next){
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.end('hello')
  }).listen(3000)