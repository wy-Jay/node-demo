
var EventEmitter = require('events').EventEmitter;

var channel = new EventEmitter();

channel.on('join', function(){
  console.log('welcome')
})


channel.emit('join')