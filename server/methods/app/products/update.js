import SimpleSchema from 'simpl-schema'

new ValidatedMethod({
  name: 'products.update',
  validate: new SimpleSchema({
    _id: String,
    product: ProductSchema,
  }).validator(),
  run: function (data) {
    this.unblock()
    const { _id, product } = data

    // product.updatedAt = new Date()

    return Products.update(
      { _id },
      {
        $set: product,
      }
    )
  },
})
