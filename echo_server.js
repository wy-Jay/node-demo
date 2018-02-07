// var net = require('net')

// var server = net.createServer(function(socket){
//   socket.on('data', function(data){
//     socket.write(data + 'socket');
//   })
// })

// server.listen(8888)

var EventEmitter = require('events').EventEmitter;

var channel = new EventEmitter();

channel.on('join', function(){
  console.log('welcome')
})


channel.emit('join')