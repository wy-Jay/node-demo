var express = require('express')
var app = new express();

app.get('/', function(req, res){
  res.end('hello expresss')
})

app.listen(3000)