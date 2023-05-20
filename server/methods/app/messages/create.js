import SimpleSchema from 'simpl-schema'
import { Configuration, OpenAIApi } from 'openai'

new ValidatedMethod({
  name: 'messages.create',
  mixins: [SignedInMixin],
  validate: new SimpleSchema({
    message: MessageSchema.omit('state', 'userId'),
  }).validator(),
  run: async function (data) {
    this.unblock()
    const { message } = data

    message.state = 'pending'
    message.userId = Meteor.userId()
    const _id = Messages.insert(message)

    if (message.type === 'text' && message.payload.text.startsWith('/sor ')) {
      const prompt = message.payload.text.substring(message.payload.text.indexOf(' ') + 1)
      openAIQuestion(_id, prompt)
    }

    return _id
  },
})

const openAIQuestion = async (_id, prompt) => {
  const configuration = new Configuration({
    apiKey: Meteor.settings.openAI.apiKey,
  })

  const openai = new OpenAIApi(configuration)
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 1,
    max_tokens: 4000,
  })

  Messages.update(
    { _id },
    {
      $set: {
        'payload.chatGPT': response.data,
      },
    }
  )
}
