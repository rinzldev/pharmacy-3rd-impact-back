const router = require('express').Router()
const cOffice = require('../controllers/office.controller')


router.get('/', cOffice.getAllOffices)
router.get('/:id', cOffice.getOfficeByID)
router.post('/', cOffice.createOffice)
router.put('/:id', cOffice.updateOffice)
router.delete('/:id', cOffice.deleteOffice)



module.exports = router