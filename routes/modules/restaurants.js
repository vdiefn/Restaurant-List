const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


//新增餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})

//看特定餐廳的detail
router.get('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
    .lean()
    .then((restaurant) => {
      res.render('show', { restaurant })
    })
    .catch(error => {
      console.log(error)
    })
})

//修改餐廳資訊
router.get('/:restaurant_id/edit', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
    .lean()
    .then((restaurant) => {
      res.render('edit', { restaurant })
    })
    .catch(error => {
      console.log(error)
    })
})
router.put('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  //解構賦值
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  Restaurant.findById(restaurant_id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => {
      res.redirect(`/restaurants/${restaurant_id}`)
    })
    .catch(error => {
      console.log(error)
    })
})


//刪除餐廳資料
router.delete('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  return Restaurant.findById(restaurant_id)
    .then(restaurant => {
      restaurant.remove()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})

//匯出
module.exports = router