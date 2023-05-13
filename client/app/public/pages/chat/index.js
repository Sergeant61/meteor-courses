Template.pagesChat.onRendered(function () {
  const self = this
  self.subscribeMessages = Meteor.subscribe('messages.list')

  this.autorun(function () {
    AppUtil.temp.get('messages')

    Meteor.setTimeout(function () {
      const messageContentEl = self.$('.brd-chat-content')
      messageContentEl.animate({ scrollTop: messageContentEl.prop("scrollHeight")}, 700);
    }, 100)
  })
})

Template.pagesChat.helpers({
  messages: function () {
    return Messages.find({}).fetch()
  },
})

Template.pagesChat.events({
  'submit form': function (event, template) {
    event.preventDefault()

    const text = event.target.text.value

    const obj = {
      message: {
        type: 'text',
        payload: {
          text,
        },
      },
    }

    Meteor.call('messages.create', obj, function (error, result) {
      if (error) {
        // todo error handling
      }

      event.target.reset()
      AppUtil.temp.set('messages', Random.id())
    })
  },
})

Template.pagesChat.onDestroyed(function () {
  this.subscribeMessages?.stop()
})
