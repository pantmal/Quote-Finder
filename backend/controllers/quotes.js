
const {Quote, Author, Objection } = require('../models/quote')

//Controller funcs for quote-based API calls

const getQuotes = (req,res) => {

    var conditions = {};

    for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            conditions[key] = req.query[key]
        }
    }
    
    Quote.find(conditions)
    .then(quotes => res.json(quotes))
    .catch(err =>  res.status(500).json({message : err.message}) )
}

const postQuote = (req,res) => {

    const { content, source, year, author, category } = req.body;

    if (!content || !source || !year || !author || !category) {
        return res.status(400).json({message: "Input is missing." });
    }

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

}

const putQuote = (req,res) => {

    Quote.findByIdAndUpdate(req.params.id, req.body, {new: true} )
    .then( quote => res.json(quote))
    .catch(err =>  res.status(500).json({message : err.message}))

}

const getObjections = (req,res) => {

    Objection.find()
    .then(objections => res.json(objections))
    .catch(err =>  res.status(500).json({message : err.message}) )

}

const postObjection = (req,res) => {

    const { comment, quote, user } = req.body;

    if (!comment || !quote || !user ) {
        return res.status(400).json({message: "Input is missing." });
    }

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

}

const getObjection = (req,res) =>{

    Objection.findById(req.params.id)
    .then(objection => res.json(objection))
    .catch(err =>  res.status(500).json({message : err.message}) )
}

const putObjection = (req,res) =>{

    Objection.findByIdAndUpdate(req.params.id, req.body, {new: true} )
    .then( objection => res.json(objection))
    .catch(err =>  res.status(500).json({message : err.message}))
}

const deleteObjection = (req,res) =>{

    Objection.findByIdAndDelete(req.params.id, req.body )
    .then( objection => res.json(objection))
    .catch(err =>  res.status(500).json({message : err.message}))
}

const getAuthors = (req,res) => {

    Author.find()
    .then(authors => res.json(authors))
    .catch(err =>  res.status(500).json({message : err.message}) )

}


const postAuthor = (req,res) => {

    const { name } = req.body;

    if (!name ) {
       return res.status(400).json({message: "Input is missing." });
    }

    const newAuthor = new Author({
        name,
    });

    newAuthor.save()
    .then( () => res.json(newAuthor))
    .catch(err =>  res.status(500).json({message : err.message}))

}

const getRandomQuote =(req,res) => {

    Quote.count()
    .then( count => {

        // Get a random entry
        var random = Math.floor(Math.random() * count)
      
        // Again query all users but only fetch one offset by our random #
        Quote.findOne().skip(random)
        .then( rand_quote => res.json(rand_quote))

    })
    .catch(err => res.status(500).json({message : err.message}))

}

module.exports = {getQuotes, postQuote, putQuote, getObjections, postObjection, getObjection,
    putObjection, deleteObjection, getAuthors, postAuthor, getRandomQuote}