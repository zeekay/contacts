var User = Backbone.Model.extend({
  urlRoot: '/api/users',
  defaults: {
    name: 'Name',
    age: 0,
    email: 'yourname@yourhost'
  }
});

var Users = Backbone.Collection.extend({
  model: User,
  url: '/api/users'
});

var UserForm = Backbone.View.extend({
  el: $('#new-user'),

  initialize: function(users) {
    var that = this;
    this.users = users;
    this.render();

    // Bind to submit, add new user to collection and re-render empty form.
    this.$el.submit(function (e) {
      that.user.save();
      that.users.add(that.user);
      that.render();
      return false;
    });
  },

  render: function(){
    var that = this;

    // Create a new user which we will save to the server.
    this.user = new User();

    // Clear existing form.
    this.$el.html('');

    // Loop default attributes in user and create form
    for (attrib in this.user.attributes) {
      // Label for attribute
      this.$el.append('<label>' + attrib + '</label>');
      // Create new input to set user attribute
      var $input = $('<input type="text" placeholder="' + this.user.get(attrib) + '"></input>');

      // Bind to change event, set attribute on user when input is changed.
      (function($input, attrib, user){
        $input.on('change', function(e) {
          user.set(attrib, $input.val());
        })
      })($input, attrib, this.user);

      this.$el.append($input);
    }

    this.$el.append('<input type="submit" value="">')

    return this;
  }
})

var UserView = Backbone.View.extend({
  tagName: 'p',

  events: {
    'click li.destroy': 'destroy'
  },

  destroy: function(e){
    this.model.destroy();
  },

  template: _.template($('#user-template').html()),

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

var UsersView = Backbone.View.extend({
  // Dom node in tree we want to render into.
  el: $('#users'),

  template: _.template($('#users-template').html()),

  initialize: function(users) {
    // Save reference to this view.
    var that = this;

    this.users = users;
    this.users.bind('all', this.render, this);

    // Fetch data from server and initially render view.
    this.users.fetch({
      success: function(collection, response){
        that.render();
      }
    });
  },

  render: function(){
    // Save reference to this view.
    var that = this;

    // Clear html
    this.$el.html('');

    // Sort by name.
    var users = this.users.sortBy(function(user){ return user.get('name'); });
    users.forEach(function(user) {
      // Create a new view for each user
      var view = new UserView({model: user});
      // Append user to this collection's view.
      that.$el.append(view.render().$el)
    })

    return this;
  }
});

var AppView = Backbone.View.extend({
  el: $('body'),
  initialize: function(){
    // Create instance of Users collection.
    this.users = new Users();

    // Instaniate our users view and new user form using our users collection.
    this.usersView = new UsersView(this.users);
    this.userForm = new UserForm(this.users);
  }
})

// Initialize app
var app = new AppView()
