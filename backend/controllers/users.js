
const bcrypt = require('bcryptjs');
const User = require('../models/user')

const {generateAccessToken} = require('../middleware/helpers')

//Controller funcs for user-based API calls

const getUsers = (req,res) => {

    User.find()
    .then(users => res.json(users))
    .catch(err =>  res.status(500).json({message : err.message}) )
}

const postUser = (req,res) => {

    const { first_name, last_name, username, password, is_admin } = req.body;

    if (!first_name || !last_name || !username || !password || !is_admin) {
        return res.status(400).json({message: "Input is missing." });
    }

    //TODO: Change to promise-like func if necessary. Actually maybe MW is better
    //User.exists({username:username})
    // .then(doc =>{ 
    //     return res.status(409).json( {message: "User Already Exist. Please Login"} ); 
    // })
    // .catch(err => console.log(err))
    
    let user_exist = false;
    User.exists({username:username}, function (err, doc) {
        if (err){
            console.log(err)
        }else{
            
            if (doc){
                return res.status(409).json({message: "User Already Exist. Please Login"}); 
            }else{
                //console.log('sth')
                const salt = bcrypt.genSaltSync(10);
                pwd_encrypt = bcrypt.hashSync(password, salt);
                
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
        }
    })

}

const getUser = (req,res) => {

    User.findById(req.params.id)
    .then( user => res.json(user))
    .catch(err =>  res.status(500).json({message : err.message}))

}

const putUser = (req,res) => {

    let updated_props = req.body;
    if ('password' in req.body){
        const salt = bcrypt.genSaltSync(10);
        pwd_encrypt = bcrypt.hashSync(req.body.password, salt);
        updated_props = {...updated_props, password:pwd_encrypt}
    }
    
    User.findByIdAndUpdate(req.params.id, updated_props, {new: true} )
    .then( user => res.json(user))
    .catch(err =>  res.status(500).json({message : err.message}))

}

const loginUser = (req,res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({message: "Input is missing."}); 
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
            console.log('Password check error')
        }
    }
    )
    .catch(err =>  res.status(500).json({message : err.message}) )
    
}

const postFavoriteQuote = (req,res) => {


    User.findById(req.params.id)
    .then(user => 
    {
	    user.fave_quotes.push(req.body.quote_id);
	    
	    user.save()
	    .then( () => res.json(user))
	    .catch(err => res.status(500).json({message : err.message}));
    })
    .catch(err =>  res.status(500).json({message : err.message}) )

}

const removeFavoriteQuote = (req,res) => {

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

}

module.exports = {getUsers, postUser, getUser, putUser, loginUser, postFavoriteQuote, removeFavoriteQuote}