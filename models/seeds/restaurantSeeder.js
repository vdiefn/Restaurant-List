const mongoose = require('mongoose')
const restaurantList = require('../../restaurant.json').results
const Restaurant = require('../restaurant')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb is connecting')
  Restaurant.create(restaurantList)
  .then(() => {
    console.log('Restaurant seeder done!')
  })
  .catch(error => {
    console.log(error)
  })
})

