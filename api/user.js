const { Router } = require('express')
const User = require('../models/User')

const rt = Router()

rt.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' })
    console.error(err)
  }
})

rt.post('/', async (req, res) => {
  try {
    const firstname = req.query.firstname
    if (typeof firstname !== 'string') throw 'empty firtsname'
    if (typeof lastname !== 'string') throw 'empty lastname'
    if (typeof email !== 'string') throw 'empty email'

    const user = new User({ firstname, lastname, email })
    await user.save()

    res.status(201).json(user)
  } catch (err) {
    if (err.message) {
      res.status(500).json({ message: 'Internal server error' })
      console.error(err)
    } else {
      res.status(400).json({ message: err })
    }
  }
})

module.exports = rt
