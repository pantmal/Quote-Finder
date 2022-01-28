const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = require('express').Router()
const User = require('../models/user')
//const Quote = require('../models/quote')

//require('dotenv').config()

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '120s' });
}

router.route('/')
.get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err =>  res.status(500).json({message : err.message}) )
})
.post((req,res) => {

    const { first_name, last_name, username, password, is_admin } = req.body;

    //TODO: Possible validation checks? (Mainly required stuff)

    //TODO: Hmm
    User.exists({username:username}, function (err, doc) {
        if (err){
            console.log(err)
        }else{
            if (doc){
                return res.status(409).json( {message: "User Already Exist. Please Login"} ); 
            }
        }
    })

    //console.log('sth')
    const salt = bcrypt.genSaltSync(10);
    pwd_encrypt = bcrypt.hashSync(password, salt);
    //console.log(typeof pwd_encrypt);
    const newUser = new User({
        username,
        password: pwd_encrypt,
        first_name,
        last_name,
        is_admin
    });

    newUser.save()
    .then( () => 
    {
        const token = generateAccessToken({ username: username });
        
        const data = {
            user: newUser,
            token: token
        }

        res.json(data)        
    }
    ).catch(err =>  res.status(500).json({message : err.message}))

}
)

router.route('/:id') //TODO: Better catch messages
.get((req,res) => {

    User.findById(req.params.id)
    .then( user => res.json(user))
    .catch(err =>  res.status(500).json({message : err.message}))
}
)
.put((req,res) => {//TODO: Add verification middleware

    User.findByIdAndUpdate(req.params.id, req.body, {new: true} )
    .then( user => res.json(user))
    .catch(err =>  res.status(500).json({message : err.message}))
    }
)


router.route('/login').post((req, res) => {

    
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
    res.status(400).send("Input is missing.");
    }
    
    User.findOne({ username: username})
    .then(user => 
    {
        if ((bcrypt.compareSync(password, user.password))){
            const token = generateAccessToken({ username: username });
            const data = {
                user: user,
                token: token
            }
    
            res.json(data)
        }else{
            console.log('sth')
        }
    }
    )
    .catch(err =>  res.status(500).json({message : err.message}) )

})
  


router.route('/favorite/:id').post((req,res) => {

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
.delete((req,res) => {

    User.findById(req.params.id)
    .then(user => 
   {
        let index = user.fave_quotes.indexOf(req.body.quote_id);
        if (index !== -1) {
            user.fave_quotes.splice(index, 1);
        }
	    
	    user.save()
	    .then( () => res.json(user))
	    .catch(err => res.status(500).json({message : err.message}));
    }
    )
    .catch(err =>  res.status(500).json({message : err.message}) )
})


module.exports = router
