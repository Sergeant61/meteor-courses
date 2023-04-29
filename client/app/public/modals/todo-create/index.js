Template.publicModalsTodoCreate.events({ 
  'submit form': function(event, template) { 
    event.preventDefault()
    const title = event.target.title.value
    const description = event.target.description.value

    const obj = {
      todo: { title, description }
    }

    Meteor.call('todos.create', obj, function(error, result) { 

      $('#brdPublicModalsTodoCreateModal').modal('hide')
      AppUtil.refreshTokens.set('todos', Random.id())
    });
  } 
});