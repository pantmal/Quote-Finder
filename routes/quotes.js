const router = require('express').Router()
const Quote = require('../models/quote')

router.route('/').get((req,res) => {
    Quote.find()
    .then(quotes => res.json(quotes))
    .catch(err =>  res.status(500).json({message : err.message}) )
})


module.exports = router
