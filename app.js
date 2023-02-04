const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
const restaurantList = require('./restaurant.json')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')


app.engine('handlebars', exphbs({defaultLayout: 'main'}))

app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)


  

app.listen( port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})