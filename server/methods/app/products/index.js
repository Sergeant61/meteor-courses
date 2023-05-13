Meteor.methods({
  products: function (data) {
    console.log(data)

    return Products.find().fetch()
  },
})
