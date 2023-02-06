const bcrypt = require('bcryptjs')
const restaurantList = require('../../restaurant.json').results
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  console.log('mongodb is connecting')
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USERS[0].password, salt))
    .then(hash => User.create({
      name: SEED_USERS[0].name,
      email: SEED_USERS[0].email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      for (let i = 0; i < 3; i++) {
        restaurantList[i].userId = userId
      }
      return Promise.all(Array.from(
        { length: 3 },
        (_, i) => Restaurant.create(restaurantList[i])
      ))
    })
    .then(() => {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USERS[1].password, salt))
        .then(hash => User.create({
          name: SEED_USERS[1].name,
          email: SEED_USERS[1].email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          for (let i = 3; i < 6; i++) {
            restaurantList[i].userId = userId
          }
          return Promise.all(Array.from(
            { length: 3 },
            (_, i) => Restaurant.create(restaurantList[i+3])
          ))
        })
        .catch(err => console.log(err))
        .then(() => {
          console.log('Demo seeder done!e')
          process.exit()
        })
    })
})

