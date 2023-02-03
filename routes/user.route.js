const router = require('express').Router()
const cUser = require('../controllers/user.controller')
const auth = require('../middlewares/authotization')

router.get('/', auth, cUser.getAllUsers)
router.get('/:id', auth,  cUser.getUserByID)
router.post('/', auth,cUser.createUser)
router.put('/:id', auth, cUser.updateUser)
router.delete('/DeleteForever/:id', auth, cUser.deleteUser)
router.delete('/:id', auth,cUser.logicaldeluser)

router.post('/login', cUser.login)

module.exports = router