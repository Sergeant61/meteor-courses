import SimpleSchema from 'simpl-schema'

new ValidatedMethod({
  name: 'todos.show',
  validate: new SimpleSchema({
    _id: String,
  }).validator(),
  run: function (data) {
    this.unblock()
    const { _id } = data

    return Todos.findOne(_id)
  },
})
