var User = Backbone.Model.extend({
  urlRoot: '/api/users',
  defaults: {
    name: 'Name',
    age: 0
  }
});

var Users = Backbone.Collection.extend({
  model: User,
  url: '/api/users'
});

var UserForm = Backbone.View.extend({
  el: $('#new-user'),

  initialize: function() { this.render(); },
  render: function(){
    var that = this;

    // Create a new user which we will save to the server.
    this.user = new User();

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

    this.$el.append('<input type="submit">')

    // Bind to submit, create new user and re-render empty form.
    this.$el.on('submit', function(e) {
      that.user.save();
      that.render();
    })

    return this;
  }
})

var UserView = Backbone.View.extend({
  tagName: 'p',

  events: {
    'click li.destroy': 'destroy'
  },

  destroy: function(e){
    console.log(e);
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

  initialize: function(){
    // Save reference to this view.
    var that = this;

    // Create instance of Users collection.
    this.users = new Users();
    this.users.bind('all', this.render, this);

    // So we can play with users in browser.
    window.users = this.users;

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

    this.users.forEach(function(user) {
      // Create a new view for each user
      var view = new UserView({model: user});
      // Append user to this collection's view.
      that.$el.append(view.render().$el)
    })

    return this;
  }
});

usersView = new UsersView();
userForm = new UserForm();
