const express = require('express')
const users = require('./modules/users')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
const auth = require('./modules/auth')
const home = require('./modules/home')

//引入 restaurants 模組程式碼
const restaurants = require('./modules/restaurants')

router.use('/users', users)
//將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組 
router.use('/restaurants', authenticator, restaurants)

router.use('/auth', auth)

//將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', authenticator, home)


module.exports = router