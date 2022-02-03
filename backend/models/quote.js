const mongoose = require('mongoose')

const Schema = mongoose.Schema

const quoteSchema = new Schema({
 
    content: {
        type:String,
        required: true
    },

    source:{
        type: String,
        required: true
    },

    year:{
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'Author', 
        required: true 
    },

    objections: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Objection' 
    }] 
});


const authorSchema = new Schema({

    name: {
        type:String,
        required: true
    },
    
    quotes: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Quote' 
    }]

});

const objectionSchema = new Schema({
 
    comment: {
        type:String,
        required: true
    },
   
    quote: { 
        type: Schema.Types.ObjectId, ref: 'Quote',
        required: true
    },
    
    user: { 
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },

});

const Quote = mongoose.model('Quote',quoteSchema);
const Author = mongoose.model('Author', authorSchema);
const Objection = mongoose.model('Objection', objectionSchema);

module.exports = {Quote, Author, Objection};
