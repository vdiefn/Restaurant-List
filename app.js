const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')

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
app.use(methodOverride('_method'))

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
app.get('/restaurants/:restaurant_id', (req,res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
  .lean()
  .sort({_id: 'asc'})
  .then((restaurant) =>{
    res.render('show', {restaurant})
  })
})

//修改餐廳資訊
app.get('/restaurants/:restaurant_id/edit', (req,res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
  .lean()
  .then((restaurant) => {
    res.render('edit', {restaurant})
  })
  .catch(error => {
    console.log(error)
  })
})
app.put('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  //解構賦值
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body
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

//搜尋餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const searchResult = restaurantList.results.filter(item => {
    return item.category.toLowerCase().includes(keyword.toLowerCase()) || item.name.toLowerCase().includes(keyword.toLowerCase()) || item.name_en.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: searchResult })
})

//刪除餐廳資料
app.delete('/restaurants/:restaurant_id', (req,res) => {
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


app.listen( port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})