const router = require('express').Router()
const cUser = require('../controllers/user.controller')
const auth = require('../middlewares/authotization')

router.get('/',  cUser.getAllUsers)
router.get('/:id',  cUser.getUserByID)
router.get('/search-by-identification/:id',  cUser.getUserByIdentification)
router.post('/', cUser.createUser)
router.put('/:id', cUser.updateUser)
router.delete('/DeleteForever/:id', cUser.deleteUser)
router.delete('/:id', cUser.logicaldeluser)

router.post('/login', cUser.login)

module.exports = router