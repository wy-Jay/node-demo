var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var command = args.shift();
var taskDesc = args.join(' ');
var file = path.join(process.cwd(), '/.tasks');

switch(command) {
  case 'list':
    listTasks(file);
    break;
  case 'add':
    addTask(file, taskDesc);
    break;
  default:
    console.log('usage: ' + process.argv[0]
    + 'list|add [taskDesc]')
  
}

function loadOrInitializeTaskArray(file, cb){
  fs.exists(file, function(exists){
    var tasks = [];
    if(exists){
      fs.readFile(file, 'utf8', function(err,data){
        if(err) throw err;
        var data = data.toString();
        var tasks = JSON.parse(data || '[]');
        cb(tasks)
      })
    } else {
      cs([])
    }
  })
}

function listTasks(file){
  loadOrInitializeTaskArray(file, function(tasks){
    for (var i in tasks){
      console.log(tasks[i])
    }
  })
}

function addTask(file ,taskDesc){
  loadOrInitializeTaskArray(file, function(tasks) {
    tasks.push(taskDesc);
    stroeTasks(file,tasks);
  })
}