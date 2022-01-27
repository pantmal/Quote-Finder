const router = require('express').Router()
const User = require('../models/user')
const Quote = require('../models/quote')

router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err =>  res.status(500).json({message : err.message}) )
})

router.route('/add_favorite/:id').post((req,res) => {

    User.findById(req.params.id)
    .then(user => 
   {

	    //Quote.findById(req.body.quote_id).then( quote => 
	    //{
	    
	    user.fave_quotes.push(req.body.quote_id);
	    
	    user.save()
	    .then( () => res.json(user))
	    .catch(err => res.status(500).json({message : err.message}));
//	    }
//	    )
//	    .catch(err => res.status(500).json({message : "1" + err.message}))
	    
    //res.json(users)
    }
    )
    .catch(err =>  res.status(500).json({message : err.message}) )
})


module.exports = router
