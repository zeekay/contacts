var express = require('express');

var app = express.createServer();

// Server files from /public
app.use(express.static(__dirname + '/public'));

// Users RESTful API
//
// CRUD:
//
// Create   -> POST
// Read     -> GET
// Update   -> PUT
// Delete   -> DELETE

var users = {
  '0': {
    name: 'Nate',
    age: 31
  }
};

// Get a list of users
app.get('/api/users', function(req, res) {
  var collection = [];
  for (user in users) {
    collection.push(users[user]);
  }
  res.send(JSON.stringify(collection));
});

// Create a new User
app.post('/api/users', function(req, res) {
});

// Update a User
app.put('/api/users/:id', function(req, res) {
});

// Delete a User
app.del('/api/users/:id', function(req, res) {
});

app.listen(3000);
