const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user')

//Funcs used for authentication/authorization

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '120s' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
    //console.log('Mw is called')
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;

    next()
}

function authorizeRole(req, res, next) {
    
    User.findOne({username: req.user.username})
    .then(user => 
    {
        //let user_obj = user.toObject();
        //console.log(user.is_admin)
        if (user.is_admin === false){
            return res.status(500).json({message : "Unauthorized user"})
        }

        next()
    })
    .catch(err =>  res.status(500).json({message : err.message}) )

    //Note: The above works because we have only one role. For multiple, it would be preferrable to use a function like so:
    //  function HasRole(role) {
    //      return function(req, res, next) {
    //          if (role !== req.user.role) res.redirect(...);
    //          else next();
    // }
    //}
    
}

module.exports = {generateAccessToken, authenticateToken, authorizeRole}