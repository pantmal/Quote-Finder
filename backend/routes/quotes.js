const router = require('express').Router()
const {Quote, Author, Objection } = require('../models/quote')

router.route('/')
.get((req,res) => {
    
    var conditions = {};

    for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            conditions[key] = req.query[key]
        }
    }
    
    Quote.find(conditions) //{author: req.query.author_id}
    .then(quotes => res.json(quotes))
    .catch(err =>  res.status(500).json({message : err.message}) )
})
.post( (req, res) => {

    //TODO: Possible validation checks? (Mainly required stuff) 
    //Also for existing: Note through objections

    const { content, source, year, author, category } = req.body;

    const newQuote = new Quote({
        content,
        source,
        year,
        author,
        category
    });

    let author_id = author

    newQuote.save()
    .then( () =>
    {
        Author.findById(author_id)
        .then(author => 
        {
            
            author.quotes.push(newQuote._id);
            author.save()
            res.json(newQuote)
        }
        )
        .catch(err =>  res.status(500).json({message : err.message}))
    })
    .catch(err =>  res.status(500).json({message : err.message}))
})

router.route('/:id')
.put((req,res) => { //permissions?

    Quote.findByIdAndUpdate(req.params.id, req.body, {new: true} )
    .then( quote => res.json(quote))
    .catch(err =>  res.status(500).json({message : err.message}))
    }
)

router.route('/objections')
.get((req,res) => {

    Objection.find()
    .then(objections => res.json(objections))
    .catch(err =>  res.status(500).json({message : err.message}) )
})
.post( (req,res) => {

    const { comment, quote, user } = req.body;

    const newObjection = new Objection({
        comment,
        quote,
        user
    });

    let quote_id = quote

    newObjection.save()
    .then( () =>
    {
        Quote.findById(quote_id)
        .then(quote => 
        {
            quote.objections.push(newObjection._id);
            quote.save()
            res.json(newObjection)
        }
        )
        .catch(err =>  res.status(500).json({message : err.message}))
    })
    .catch(err =>  res.status(500).json({message : err.message}))
})

router.route('/objections/:id')
.get((req,res) => {

    Objection.findById(req.params.id)
    .then(objection => res.json(objection))
    .catch(err =>  res.status(500).json({message : err.message}) )
})
.put( (req,res) => {

    Objection.findByIdAndUpdate(req.params.id, req.body, {new: true} )
    .then( objection => res.json(objection))
    .catch(err =>  res.status(500).json({message : err.message}))
    }
)
.delete( (req,res) => {

    Objection.findByIdAndDelete(req.params.id, req.body )
    .then( objection => res.json(objection))
    .catch(err =>  res.status(500).json({message : err.message}))
    
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


module.exports = router