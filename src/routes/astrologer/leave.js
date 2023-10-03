const {Router} = require('express')
const { getLeaves, createLeave } = require('../../controllers/astrologer/leave')
const router = Router()

router.get('/leave',getLeaves)
router.post('/leave',createLeave)

module.exports = router