const { model, Schema } = require('mongoose')

const User = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true }
})

module.exports = model('User', User)
