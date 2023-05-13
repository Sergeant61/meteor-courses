import SimpleSchema from 'simpl-schema'

new ValidatedMethod({
  name: 'products.create',
  validate: new SimpleSchema({
    product: ProductSchema.omit('state'),
  }).validator(),
  run: function (data) {
    this.unblock()
    const { product } = data

    // const now = new Date()

    // product.state = 'in-process'
    // product.createdAt = now
    // product.updatedAt = now
    return Products.insert(product)
  },
})
