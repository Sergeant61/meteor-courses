Meteor.publish('users.list', function () {
  if (this.userId) {
    return Meteor.users.find({}, { fields: { profile: 1, emails: 1 } })
  } else {
    return this.ready()
  }
})
