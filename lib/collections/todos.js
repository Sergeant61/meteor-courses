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
})

Todos.attachSchema(TodoSchema)
