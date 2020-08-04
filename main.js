const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.static('frontend/dist'))
app.use('/api/user', require('./api/user'))

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGOURI || 'mongodb://127.0.0.1/test'

!(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(PORT, () => console.log(`now listening ${PORT}`))
  } catch (err) {
    console.error(err.message)
  }
})()
