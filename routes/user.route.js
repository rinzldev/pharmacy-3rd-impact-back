const router = require('express').Router()
const cUser = require('../controllers/user.controller')

router.post('/', cUser.createUser)

module.exports = router