Meteor.methods({
  todos: function (data) {
    console.log(data)

    return Todos.find().fetch()
  },
})
