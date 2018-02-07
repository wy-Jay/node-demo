function divEscapedContentElement(message){
  return $('<div></div>').text(message)
}

function divSystemContentElement(message){
  return $('<div></div>').html('<i>'+ message +'</i>')
}

function processUserInput(chatApp, socket){
  var message = $('#send-message').val();
  var systemMessage;

  if (message.chatAt(0) == '/'){
    systemMessage = chatApp.processCommand(message);
    if(systemMessage){
      $('#message').append(divSystemContentElement(systemMessage));
    }
  }else{
    chatApp.sendMessage($('#room').text(), message);
    $('#messages').append(divEscapedContentElement(message))
    $('#messages').scrollTop($('#message').prop('scrollHeight'));
  }

  $('#send-message').val()
}

var socket = io.connect();
$(document).ready(function(){
  var chatApp = new (socket);

  socket.on('nameResult', function(result){
    var message;

    if(result.successs){
      message = 'u are now known as ' + result.name + '.'
    } else {
      message = result.message;
    }
    $('#message').append(divSystemContentElement(message));
  })

  socket.on('joinResult', function(result){
    $('#room').text(result.room);
    $('#message').append(divSystemContentElement('room changed'));
  })

  socket.on('message', function(message){
    var newElement = $('<div></div>').text(message.text);
    $('#message').append(newElement);
  })

  socket.on('rooms', function(rooms){
    $('#room-list').empty();
    
    for (var room in rooms) {
      room = room.substring(1, room.length);
      if(room != '') {
        $('#room-list').append(divEscapedContentElement(room));
      }
    }
    $('#room-list div').click(function(){
      
    })
  })

})
socket.on