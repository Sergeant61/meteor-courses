
Template.pagesChat.onRendered(function() {
  const self = this
  self.subscribeMessages = Meteor.subscribe('messages.list');
});

Template.pagesChat.helpers({
  messages: function() {
    return Messages.find({}).fetch()
  }
});


Template.pagesChat.events({
  'submit form': function (event, template) {
    event.preventDefault()

    const text = event.target.text.value

    const obj = {
      message: {
        type: 'text',
        payload: {
          text
        }
      }
    }

    Meteor.call('messages.create', obj, function (error, result) {
      if (error) {
        // todo error handling
      }

      event.target.reset()
    })
  }
})

Template.pagesChat.onDestroyed(function() { 
  this.subscribeMessages?.stop()
});