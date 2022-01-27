const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
 username: {
  type:String,
  required: true
 },
 password:{
        type: String,
        required: true
    },
 first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    is_admin:{
        type: Boolean,
        required: true
    },
   fave_quotes: [{ type: Schema.Types.ObjectId, ref: 'Quote' }]
   //https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
 
});

const User = mongoose.model('User',userSchema);

module.exports = User;
