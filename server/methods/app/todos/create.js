import SimpleSchema from 'simpl-schema'

new ValidatedMethod({
  name: 'todos.create',
  validate: new SimpleSchema({
    todo: TodoSchema.omit('state'),
  }).validator(),
  run: function (data) {
    this.unblock()
    const { todo } = data

    const now = new Date()

    todo.state = 'in-process'
    todo.createdAt = now
    todo.updatedAt = now
    return Todos.insert(todo)
  },
})
