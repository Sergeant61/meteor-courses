Template.publicModalsTodoUpdate.onRendered(function() {
  const self = this;

  const modalEl = this.$('#brdPublicModalsTodoUpdateModal')[0]
  modalEl.addEventListener('hidden.bs.modal', function (event) {
    self.$('form')[0].reset()
    AppUtil.temp.set('todo', null)
  })
});

Template.publicModalsTodoUpdate.events({ 
  'submit form': function(event, template) { 
    event.preventDefault()

    const todo = AppUtil.temp.get('todo')

    const title = event.target.title.value
    const description = event.target.description.value
    const state = event.target.state.value

    const obj = {
      _id: todo._id,
      todo: { title, description, state }
    }

    Meteor.call('todos.update', obj, function(error, result) { 

      $('#brdPublicModalsTodoUpdateModal').modal('hide')
      AppUtil.refreshTokens.set('todos', Random.id())
    });
  } 
});