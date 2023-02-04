const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//瀏覽所有餐廳
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' } || {location: 'asc'} || {name : 'asc'} || {name: 'desc'})
    .then((restaurants) => {
      return res.render('index', { restaurants })
    })
    .catch(error => {
      console.log(error)
    })
})

//搜尋餐廳
router.get('/search', (req, res) => {
  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const searchResult = restaurants.filter(item => {
        return item.category.toLowerCase().includes(keyword.toLowerCase()) ||
          item.name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.name_en.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { restaurants: searchResult, keywords })
    })
    .catch(error => {
      console.log(error)
    })
})


//匯出路由模組
module.exports = router