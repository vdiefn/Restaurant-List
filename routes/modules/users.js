const express = require('express')
const User = require('../../models/user')
const passport = require('passport')
const router = express.Router()

//登入
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//註冊
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists!')
      res.render('register', { 
        name, 
        email, 
        password, 
        confirmPassword })
    } else {
      return User.create({ 
        name,
        email,
        password
      })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

router.get('/register', (req, res) => {
  res.render('register')
})

//登出
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router