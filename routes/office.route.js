const router = require('express').Router()
const cOffice = require('../controllers/office.controller')


router.get('/', cOffice.getAllOffices)
router.get('/:id', cOffice.getOfficeByID)
router.get('/search-by-code/:id', cOffice.getOfficeByCode)
router.post('/', cOffice.createOffice)
router.put('/:id', cOffice.updateOffice)
router.delete('/DeleteForever/:id', cOffice.deleteOffice)
router.delete('/:id', cOffice.logicaldeloffice)


module.exports = router