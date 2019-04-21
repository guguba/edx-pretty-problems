const express = require('express')
const problem_api = express.Router()


/**
 *
 *
 * Problems api
 *
 * /api/problems
 *
 * GET -> PROBLEM[]
 * GET ../:id PROBLEM
 * POST { params } -> PROBLEM
 * DELETE -> TRUE
 * PUT { params } -> PROBLEM
 *
 */


problem_api.get('/', (req, res) => {
  return  [
    { id: 5, questiorns: [] } ,
    { id: 6, questiorns: [] }
  ]
})

problem_api.get('/:id', (req, res) => {
  return { id: 5, questiorns: [] }
})

problem_api.post('/', (req, res) => {
  return { id: 5, questiorns: [] }
})

problem_api.put('/:id', (req, res) => {
  return { id: 5, questiorns: [{aaa}] }
})


module.exports = problem_api