const router = require('express').Router()
const cLaboratory = require('../controllers/laboratory.controller')


router.get('/', cLaboratory.getAllLaboratory)
router.get('/:id', cLaboratory.getLaboratoryByID)
router.post('/', cLaboratory.createLaboratory)
router.put('/:id', cLaboratory.updateLaboratory)
// router.delete('/DeleteForever/:id', cMedicine.deleteMedicine)
// router.delete('/:id', cMedicine.logicaldelMedicine)



module.exports = router