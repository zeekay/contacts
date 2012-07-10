var User = Backbone.Model.extend({});

var Users = Backbone.Collection.extend({
  model: User,
  url: '/api/users'
});

var UserView = Backbone.View.extend({
  tagName: 'li',

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
