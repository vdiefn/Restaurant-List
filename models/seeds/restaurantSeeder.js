const restaurantList = require('../../restaurant.json').results
const Restaurant = require('../restaurant')

const db = mongoose.connection



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

