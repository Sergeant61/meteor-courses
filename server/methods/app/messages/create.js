import SimpleSchema from 'simpl-schema'

new ValidatedMethod({
  name: 'messages.create',
  validate: new SimpleSchema({
    message: MessageSchema.omit('state', 'userId'),
  }).validator(),
  run: function (data) {
    this.unblock()
    const { message } = data

    message.state = 'pending'
    return Messages.insert(message)
  },
})
