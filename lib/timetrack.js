var qs = require('queryString');

exports.sendHtml = function(req, res){
  res.setHead('Content-Type', 'text/html')
  res.setHead('Content-Length', Buffer.byteLength(html));
  res.end(html)
}