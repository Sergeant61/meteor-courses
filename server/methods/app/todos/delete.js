import SimpleSchema from 'simpl-schema'

new ValidatedMethod({
  name: 'todos.delete',
  validate: new SimpleSchema({
    _id: String,
  }).validator(),
  run: function (data) {
    this.unblock()
    const { _id } = data

    return Todos.remove({ _id })
  },
})
