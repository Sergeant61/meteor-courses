
Template.pagesWorking.onCreated(function () {
  this.count = new ReactiveVar(0)

  this.maps = new ReactiveDict(null, {
    name: 'Recep',
    lastname: 'Özen',
    count: 0,
  })
})

Template.pagesWorking.onRendered(function () {
  const self = this

  function onDone(err, status) {
    if (err) {
      // here we can handle errors and clean up any loose ends.
      console.error(err)
    }
    if (status.authorized) {

      function displayContents(err, text) {
        if (err) {
          // an error occurred, or the scan was canceled (error code `6`)
        } else {
          // The scan completed, display the contents of the QR code:
          alert(text)
        }
      }

      QRScanner.scan(displayContents)

      // Make the webview transparent so the video preview is visible behind it.
      QRScanner.show()
      // W00t, you have camera access and the scanner is initialized.
      // QRscanner.show() should feel very fast.
    } else if (status.denied) {
      // The video preview will remain black, and scanning is disabled. We can
      // try to ask the user to change their mind, but we'll have to send them
      // to their device settings with `QRScanner.openSettings()`.
    } else {
      // we didn't get permission, but we didn't get permanently denied. (On
      // Android, a denial isn't permanent unless the user checks the "Don't
      // ask again" box.) We can ask again at the next relevant opportunity.
    }
  }

  QRScanner.prepare(onDone) // show the prompt
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
    Todos.insert({ title: 'my-todo', state: 'in-process' })
  },
})
