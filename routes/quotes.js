const router = require('express').Router()
const {Quote, Author } = require('../models/quote')

router.route('/')
.get((req,res) => {
    
    Quote.find({author: req.query.author_id})
    .then(quotes => res.json(quotes))
    .catch(err =>  res.status(500).json({message : err.message}) )
})
.post( (req, res) => {

    //TODO: Possible validation checks? (Mainly required stuff) 
    //Also for existing: Note through objections

    const { content, source, year, author } = req.body;

    const newQuote = new Quote({
        content,
        source,
        year,
        author
    });

    newQuote.save()
    .then( () => res.json(newQuote))
    .catch(err =>  res.status(500).json({message : err.message}))
    //TODO: Add quote to the author too...
})

router.route('/authors')
.get((req,res) => {

    Author.find()
    .then(authors => res.json(authors))
    .catch(err =>  res.status(500).json({message : err.message}) )
})
.post( (req,res) => {

    const { name } = req.body;

    const newAuthor = new Author({
        name,
    });

    newAuthor.save()
    .then( () => res.json(newAuthor))
    .catch(err =>  res.status(500).json({message : err.message}))
})

router.route('/random')
.get((req,res) => {

    Quote.count()
    .then( count => {

        // Get a random entry
        var random = Math.floor(Math.random() * count)
      
        // Again query all users but only fetch one offset by our random #
        Quote.findOne().skip(random)
        .then( rand_quote => res.json(rand_quote))

    })
    .catch(err =>  res.status(500).json({message : err.message}))
        
      
})

// router.route('/categories/:id')
// .get((req,res) => {

//     Category.findById(req.params.id)
//     .then(cat => 
//     {
//         Quote.find({category: req.params.id})
//         .then(quotes => res.json(quotes))
//         .catch(err =>  res.status(500).json({message : err.message}) )
//     }
//     )
//     .catch(err =>  res.status(500).json({message : err.message}) )
            
// })




module.exports = router