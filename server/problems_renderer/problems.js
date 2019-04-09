const express = require('express')
const router = express.Router()




router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.render('problems', { titie: 'sdf', body: 'asdasd'})
})



module.exports = router