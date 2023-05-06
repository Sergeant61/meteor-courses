import SimpleSchema from 'simpl-schema'

new ValidatedMethod({
  name: 'todos.update',
  validate: new SimpleSchema({
    _id: String,
    todo: TodoSchema,
  }).validator(),
  run: function (data) {
    this.unblock()
    const { _id, todo } = data

    todo.updatedAt = new Date()

    return Todos.update(
      { _id },
      {
        $set: todo,
      }
    )
  },
})
