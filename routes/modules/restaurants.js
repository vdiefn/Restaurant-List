const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


//新增餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body 
  const userId = req.user._id
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})

//看特定餐廳的detail
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => {
      res.render('show', { restaurant })
    })
    .catch(error => {
      console.log(error)
    })
})

//修改餐廳資訊
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId})
    .lean()
    .then((restaurant) => {
      res.render('edit', { restaurant })
    })
    .catch(error => {
      console.log(error)
    })
})
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  //解構賦值
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  Restaurant.findOne({ _id, userId} )
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
      res.redirect(`/restaurants/${_id}`)
    })
    .catch(error => {
      console.log(error)
    })
})


//刪除餐廳資料
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// router.delete('/:restaurant_id', (req, res) => {
//   const restaurant_id = req.params.restaurant_id
//   const userId = req.user._id
//   return Restaurant.findOne({ restaurant_id, userId })
//     .then(restaurant => restaurant.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

//匯出
module.exports = router