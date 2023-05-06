import SimpleSchema from 'simpl-schema'

Messages = new Mongo.Collection('messages')

MessagePayloadSchema = new SimpleSchema({
  text: {
    type: String,
    optional: true,
  },
})

MessageSchema = new SimpleSchema({
  userId: {
    type: String,
    optional: true,
  },

  state: {
    type: String,
    allowedValues: ['sent', 'pending', 'error'],
  },

  type: {
    type: String,
    allowedValues: ['text', 'image', 'audio', 'video', 'document'],
  },

  payload: MessagePayloadSchema,
})

Messages.attachSchema(MessageSchema)
// Messages.autoDates()
