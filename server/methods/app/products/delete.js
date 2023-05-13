import SimpleSchema from 'simpl-schema'

new ValidatedMethod({
  name: 'products.delete',
  validate: new SimpleSchema({
    _id: String,
  }).validator(),
  run: function (data) {
    this.unblock()
    const { _id } = data

    return Products.remove({ _id })
  },
})
