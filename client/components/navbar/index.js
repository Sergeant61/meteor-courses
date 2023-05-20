import { FlowRouter } from 'meteor/ostrio:flow-router-extra'

Template.componentsNavbar.events({
  'click .brd-sign-out': function (event, template) {
    Meteor.logout(function (error) {
      if (error) {
        // todo error handling
        return
      }

      FlowRouter.go('public.home')
    })
  },
})
