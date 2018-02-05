var http = require('http')
var fs = require('fs')
var path = require('path')
var mime = require('mime')
var chatServer = require('./lib/chat_server')

var cache = {

}


chatServer.listen(server)

// 404响应
function send404(response){
  response.writeHead(404,{'Content-Type' : 'text/plain'});
  response.write('error 404 : resource not found')
  response.end();
}

// 文件数据服务
function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200,
    {'content-type' : mime.getType(path.basename(filePath))}
  )
  response.end(fileContents)
}

// 静态文件服务
function serverStatic(res, cache, absPath){
  if(cache[absPath]){
    sendFile(res,absPath, cache[absPath]);
  } else {
    fs.exists(absPath, function(exists) {
      if(exists){
        fs.readFile(absPath, function(err, data){
          if(err){
            send404(res)
          }else {
            cache[absPath] = data;
            sendFile(res, absPath, data)
          }
        })
      }else{
        send404(res)
      }
    })
  }
}

// http服务
var server = http.createServer(function(req,res){
  var filePath = false;

  if(req.url == '/'){
    filePath = 'public/index.html'
  } else {
    filePath = 'public' + req.url
  }

  var absPath = './' + filePath;

  serverStatic(res, cache, absPath)
})

server.listen(3000, function(){
  console.log('server listening on port 3000')
})