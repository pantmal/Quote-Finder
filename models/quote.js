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

    author: { type: Schema.Types.ObjectId, ref: 'Author' }
    //category: { type: Schema.Types.ObjectId, ref: 'Category' }
});
//TODO: Decide on required

const authorSchema = new Schema({

    name: {
    type:String,
    required: true
    },
    
    quotes: [{ type: Schema.Types.ObjectId, ref: 'Quote' }]

});

// const categorySchema = new Schema({

//     name: {
//     type:String,
//     required: true
//     },
    
//     quotes: [{ type: Schema.Types.ObjectId, ref: 'Quote' }]

// });


const Quote = mongoose.model('Quote',quoteSchema);
const Author = mongoose.model('Author', authorSchema);
//const Category = mongoose.model('Category', categorySchema);

module.exports = {Quote, Author};
