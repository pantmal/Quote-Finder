const router = require('express').Router()

const {authenticateToken, authorizeRole} = require('../middleware/helpers')

const {getQuotes, postQuote, putQuote, getObjections, postObjection, getObjection,
    putObjection, deleteObjection, getAuthors, postAuthor, getRandomQuote} = require('../controllers/quotes')

//Quote-based API routes.

router.route('/').get(getQuotes).post(postQuote)
router.route('/:id').put(authenticateToken,authorizeRole, putQuote)
router.route('/objections').get(getObjections).post(postObjection)
router.route('/objections/:id').get(getObjection).put(putObjection).delete(deleteObjection)
router.route('/authors').get(getAuthors).post(postAuthor)
router.route('/random').get(getRandomQuote)

module.exports = router