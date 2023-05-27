import SimpleSchema from 'simpl-schema'

Cars = new Mongo.Collection('cars')

CarPayloadSchema = new SimpleSchema({
  title: String,
})

CarChoiceSchema = new SimpleSchema({
  text: String,
  index: Number,
  logprobs: SimpleSchema.Any,
  finish_reason: String,
})

CarSchema = new SimpleSchema(
  {
    title: {
      type: String,
      optional: function () {
        return this.field('number').value > 5
      },
      min: 8,
    },
    number: {
      type: Number,
      max: 99,
    },
    status: {
      type: String,
      allowedValues: ['pending', 'in-process', 'cancel', 'done'],
    },
    boolean: Boolean,
    integer: SimpleSchema.Integer,
    any: SimpleSchema.Any,
    date: Date,
    payload: {
      type: CarPayloadSchema,
      optional: true,
    },

    lists: Array,
    'lists.$': {
      type: String,
      optional: true,
    },

    choices: Array,
    'choices.$': CarChoiceSchema,

    // todo fix me
    data: {
      type: Object,
    },

    'data.id': String,
  },
  {
    requiredByDefault: false,
  }
)

Cars.attachSchema(CarSchema)
// Cars.autoDates()

const _id = Cars.insert({
  title: 'title',
  payload: {},
  lists: ['dnvlkwenvlw', 'dnvwkenw', 'kdvkenvk', 'djvn kvwk', 'vkejvnevke'],

  choices: [
    {
      text: 'lknelkl',
      index: 1212,
      logprobs: 'fhwıe',
      finish_reason: 'nenvke',
    },
  ],
})

Messages.update({ _id: "EaazYGsKTM3E86EtJ" },{
  $set:{
    type: 'image'
  },
}, { })

Cars.update({ _id },{
  $unset:{
    'payload.chatGPT': ''
  }
}, { })

Cars.update({ _id: _id },{
  $push:{
    lists: 'erbmelrkbe'
  },
  $pull:{
    choices: { _id:1212 }
  }
}, { })

Cars.update({ status: 'pending' },{
  $set:{
    status: 'in-process'
  }
}, { multi:true })

// ! yanlış kullanım
Cars.update({ status: 'pending' },{
  $set:{
    status: 'cancel'
  }
}, { multi:true })

// ! yanlış kullanım
Cars.update({ status: 'in-process' },{
  $set:{
    status: 'cancel'
  }
}, { multi:true })

const ids = Cars.find({status: { $in: ['pending', 'in-process']}}, { sort: { createdAt:-1 }, limit:1 }).fetch().map(c => c._id)
Cars.update({ _id: {$in: ids } },{
  $set:{
    status: 'cancel'
  }
}, { multi:true })

const today = new Date()
// * doğru kullanım
Cars.update({ status: { $in: ['pending', 'in-process']}, createdAt: { $lte: today } },{
  $set:{
    status: 'cancel'
  }
}, { multi:true })

Cars.findOne({ status: { $in: ['pending', 'in-process']} })
Cars.find({ status: { $in: ['pending', 'in-process']} }).fetch()
Cars.remove({ status: { $in: ['pending', 'in-process']} })