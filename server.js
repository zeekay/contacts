var dirty = require('dirty');
var express = require('express');
var uuid = require('node-uuid');

// Create new database
var db = dirty(__dirname + '/users.db');

// Create new express app
var app = express.createServer();

// Log requests
app.use(express.logger());
// Serve static files in ./public
app.use(express.static(__dirname + '/public'));
// Parse json sent to use from Backbone.js
app.use(express.bodyParser());

// Backbone Users model RESTful API
// --------------------------------
// Backbone expects the typical CRUD methods to map to these HTTP methods:
//
// Create -> POST
// Read   -> GET
// Update -> PUT
// Delete -> DELETE

// Get a list of users
app.get('/api/users', function(req, res) {
  var collection = [];
  db.forEach(function(id, user) {
    user.id = id;
    collection.push(user);
  })
  res.json(collection);
});

// Get a single model
app.get('/api/users/:id', function(req, res) {
  var user = db.get(id);
  res.json(user);
});

// Create a new User
app.post('/api/users', function(req, res) {
  var user = req.body;
  var id = uuid.v4();

  db.set(id, user);
  res.send('ok')
});

// Update a User
app.put('/api/users/:id', function(req, res) {
  db.set(req.params.id, req.body);
  res.send('ok')
});

// Delete a User
app.del('/api/users/:id', function(req, res) {
  db.rm(req.params.id);
  res.send('ok')
});

app.listen(3000);
