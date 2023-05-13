Template.pagesHome.onCreated(function () {
  this.state = new ReactiveDict(null, {
    test: null,
  })
  const self = this

  this.name = 'Recep'
  console.log(this.name)
})

Template.pagesHome.onRendered(function () {
  const self = this
  console.log(this.name)

  Meteor.call('test.get', {}, function (e, r) {
    console.log(e, r)

    self.state.set('test', r)
  })
})

Template.pagesHome.onDestroyed(function () {
  const self = this
  console.log(this.name)
})

Template.pagesHome.helpers({
  upperCase: function (name) {
    const self = Template.instance()

    return name?.toUpperCase()
  },
  eq: function (v1, v2) {
    return v1 == v2
  },
})

Template.pagesHome.events({
  'click .brd-btn-click': function (event, template) {
    event.preventDefault()
    console.log(event)
    console.log(template)
  },
})

const Template1 = {
  pagesHome: {
    name: 'Recep',

    data: {
      name: 'Recep',
    },
  },
}
