// TODO: change name to problems renderer

const express = require('express')
const problems = express.Router()


problems.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
problems.get('/about', function (req, res) {
  res.send('About birds')
})


module.exports = problems;