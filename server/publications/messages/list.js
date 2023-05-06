Meteor.publish('messages.list', function (data) {

  return Messages.find({})
})
