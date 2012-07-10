var express = require('express');
var uuid = require('node-uuid');

var app = express.createServer();

// Server files from /public
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

// Users RESTful API
//
// CRUD:
//
// Create   -> POST
// Read     -> GET
// Update   -> PUT
// Delete   -> DELETE

var users = {
  '61e9c450-cc79-457c-b717-16a70b4a9ef8': {
    name: 'Nate',
    age: 31
  },
  '29c5c99f-6f39-4990-af7b-a8923cf6a96d': {
    name: 'Tom',
    age: 44
  }
};

// Get a list of users
app.get('/api/users', function(req, res) {
  console.log('GET /api/users');
  var collection = [];
  for (var id in users) {
    var user = users[id];
    user.id = id;
    collection.push(user);
  }
  res.json(collection, 200);
});

// Get a single model
app.get('/api/users/:id', function(req, res) {
  console.log('GET /api/users/' + req.params.id);
  var user = users[id];
  res.json(user, 200);
});

// Create a new User
app.post('/api/users', function(req, res) {
  console.log('POST /api/users', req.body);
  var user = req.body;
  var id = uuid.v4();

  users[id] = user;
  res.send('ok')
});

// Update a User
app.put('/api/users/:id', function(req, res) {
  console.log('PUT /api/users/' + req.params.id, req.body);
  // Update user with new body
  users[req.params.id] = req.body;
  res.send('ok')
});

// Delete a User
app.del('/api/users/:id', function(req, res) {
  console.log('DELETE /api/users/' + req.params.id);
  // delete user by name
  delete users[req.params.id]
  res.send('ok')
});

app.listen(3000);
