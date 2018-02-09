var http = require('http');
var url = require('url');
var items = [];



var server = http.createServer(function(req,res){
  switch(req.method){
    case 'POST':
      var item = '';
      req.setEncoding('utf8')
      req.on('data', function(chunk){
        item += chunk;
      })
      req.on('end', function(){
        items.push(item)
        res.end('post ok\n')
      })
      break;
    case 'GET' : 
      var body = items.map((item,index) => {
        return (index + ':' + item )
      }).join('\n')
      res.setHeader('Content-Type', Buffer.byteLength(body));
      res.setHeader('Content-Type' , 'text/plain;charset="utf-8"')
      res.end();
      break
    case 'DELETE' : 
      var path = url.parse(req.url).pathname;
      var i = parseInt(path.splice(1),10);
      if(isNaN(i)) {
        res.statusCode = 400;
        res.end('incalid item id');
      }else if(!items[i]){
        res.statusCode = 404;
        res.end('item not found')
      }else{
        items.splice(i, 1);
        res.end('ok\n')
      }
      break;
  }

})

server.listen(3000)