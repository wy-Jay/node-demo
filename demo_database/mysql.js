
var http = require('http');
var work = require('../lib/timetrack');
var mysql = require('mysql');

var db = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password : 'fe246650',
  database : 'timetrack'
})