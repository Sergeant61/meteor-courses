import SimpleSchema from 'simpl-schema'

Todos = new Mongo.Collection('todos')

TodoSchema = new SimpleSchema({
  title: String,
  description: {
    type: String,
    optional: true,
  },
  state: {
    type: String,
    allowedValues: ['in-process', 'done'],
  },
  createdAt: {
    type: Date,
    optional: true,
  },
  updatedAt: {
    type: Date,
    optional: true,
  },
})

Todos.attachSchema(TodoSchema)
// Todos.autoDates()
