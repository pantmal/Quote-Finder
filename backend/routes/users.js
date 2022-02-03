
const router = require('express').Router()

const {authenticateToken} = require('../middleware/helpers')

const {getUsers, postUser, getUser, putUser, loginUser, postFavoriteQuote, removeFavoriteQuote} = require('../controllers/users')

//User-based API routes.

router.route('/').get(getUsers).post(postUser)
router.route('/:id').get(getUser).put(authenticateToken, putUser)
router.route('/login').post(loginUser)
router.route('/favorite/:id').post(postFavoriteQuote).delete(removeFavoriteQuote)


module.exports = router
