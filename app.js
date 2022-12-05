const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id)
  console.log('req id', req.params.restaurant_id)
  res.render('show', {restaurant: restaurant})
})

app.get('/search/', (req,res) =>{
  console.log('req query:', req.query)
  const keyword = req.query.keyword.trim()
  const searchResult = restaurantList.results.filter( item => {
    return item.category.toLowerCase().includes(keyword.toLowerCase()) || item.name.toLowerCase().includes(keyword.toLowerCase()) || item.name_en.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: searchResult })
})

app.listen( port, () => {
  console.log(`Express is running on heep://localhost:${port}`)
})