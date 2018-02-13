var parse = require('url').parse;
module.exports = function route(obj){
  return function(req, res, next){
    if( !obj[req.method]) {
      next();
      return;
    }
  }

  var routes = obj[req.method]
  var url = parse(req.url)
  var paths = Object.keys(routes)
  for (var i = 0; i< paths; i++){
    var path = paths[i];
    var fn = routes[path]
    path = path
      .replace(/\//g, '\\/')
      .replace(/:(\w+)/g, '([^\\/]+)')
    var re = new RegExp('^' + url.pathname.match(re))
    var captures = url.pathname.match(re)
  }
}