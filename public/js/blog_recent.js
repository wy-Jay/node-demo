var fs = require('fs')
var http = require('http');



var server = http.createServer(function(req, res){
  getTitles(res)
}).listen(8000,'127.0.0.1')

function getTitles(res){
  fs.readFile('./title.json', function(err, data){
    if(err){
      handleError()
    }else{
      var titles = JSON.parse(data.toString());
      getTemplate(titles, res)
      
    }
  })
}

function getTemplate(titles, res){
  fs.readFile('./template.html', function(err, data){
    if(err){
      handleError
    }else{
      var temp = data.toString();
      var html = temp.replace('%', titles.join('<li></li>'));
      res.writeHead(200, {'Content-type': 'text/html'});
      res.end(html)
    }
  })
}

function handleError (){
  console.log(err)
  res.end('server error')
}