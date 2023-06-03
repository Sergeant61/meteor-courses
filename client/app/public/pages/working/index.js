Template.pagesWorking.onCreated(function () {
  this.state = new ReactiveDict(null, {
    base64PP: null,
  });

  this.count = new ReactiveVar(0)

  this.maps = new ReactiveDict(null, {
    name: 'Recep',
    lastname: 'Özen',
    count: 0,
  })

  this.getBase64 = function (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject( error);
      };
    })
  }
})

Template.pagesWorking.onRendered(function () {
  const self = this

  this.autorun(function () {
    const count = self.count.get()

    console.log(count)
  })

  this.autorun(function () {
    const count = self.maps.get('count')

    console.log(count)
  })

  this.autorun(function () {

    Meteor.call('todos', {_id: 1}, function(error, result) { 

    console.log(error, result)

    });

  })
})

Template.pagesWorking.helpers({
  count: function () {
    return Template.instance().count
  },
  maps: function () {
    return Template.instance().maps
  },
  todos: function () {
    return Todos.find().fetch()
  },
})

Template.pagesWorking.events({
  'click .brd-add': function (event, template) {
    template.count.set(template.count.get() + 1)
    template.maps.set('count', template.count.get('count') + 1)
  },
  'click .brd-insert': function (event, template) {
    Todos.insert({ title: 'my-todo', state:'in-process' })
  },
  'change #brPagesWorkingPPFileInput': async function (event, template) {

    console.log(event.target.files);

    template.state.set('base64PP', await template.getBase64(event.target.files[0]))  
  },
})
