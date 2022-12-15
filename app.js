const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

//瀏覽所有餐廳
app.get('/', (req,res) => {
  Restaurant.find()
  .lean()
  .then((restaurants) => {
    return res.render('index', {restaurants})
  })
  .catch(error => {
    console.log(error)
  })
})


//新增餐廳
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req,res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({name, name_en, category, image, location, phone, google_map, rating, description})
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})

//看特定餐廳的detail
// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)
//   res.render('show', {restaurant: restaurant})
// })
app.get('/restaurants/:restaurant_id', (req,res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
  .lean()
  .then((restaurant) =>{
    res.render('show', {restaurant})
  })
})

//搜尋餐廳
app.get('/search/', (req,res) =>{
  const keyword = req.query.keyword.trim().toLowerCase()
  const searchResult = restaurantList.results.filter( item => {
    return item.category.toLowerCase().includes(keyword.toLowerCase()) || item.name.toLowerCase().includes(keyword.toLowerCase()) || item.name_en.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: searchResult })
})





app.listen( port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})