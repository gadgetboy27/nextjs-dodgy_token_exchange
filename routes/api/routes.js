const express = require('express')
const router = express.Router()
const terms = require('../../terms')

// Gets terms
router.get('/', (req, res) => res.json(terms))

// Get single term
router.get('/:id', (req, res) => {
  const found = terms.some(term => term.id === parseInt(req.params.id))

  if (found) {
    res.json(terms.filter(term => term.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `No term with the id of ${req.params.id}` })
  }
})

// Create a term
router.post('/', (req, res) => {
  const newTerm = {
    id: Number,
    term: req.body.term,
    status: 'active'
  }
  if (!newTerm.name || !newTerm.term) {
    return res.status(400).json({ msg: 'Please write a new term' })
  }
  terms.push(newTerm)
  res.json(terms)
})

module.exports = router
