import SimpleSchema from 'simpl-schema'

Messages = new Mongo.Collection('messages')

MessagePayloadChatGPTSchema = new SimpleSchema({
  id: String,
  object: String,
  created: Number,
  model: String,
  choices: Array,
  'choices.$': Object,
  'choices.$.text': String,
  'choices.$.index': Number,
  'choices.$.logprobs': SimpleSchema.Any,
  'choices.$.finish_reason': String,
  usage: Object,
  'usage.prompt_tokens': Number,
  'usage.completion_tokens': Number,
  'usage.total_tokens': Number,
},{
  requiredByDefault: false
})

MessagePayloadSchema = new SimpleSchema({
  text: {
    type: String,
    optional: true,
  },

  chatGPT: {
    type: MessagePayloadChatGPTSchema,
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
