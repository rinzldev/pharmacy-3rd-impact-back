const router = require('express').Router()
const cMedicine = require('../controllers/medicine.controller')


router.get('/', cMedicine.getAllMedicines)
router.get('/:id', cMedicine.getMedicineByID)
router.post('/', cMedicine.createMedicine)
router.put('/:id', cMedicine.updateMedicine)
//router.delete('/:id', cMedicine.deleteMedicine)
router.delete('/:id', cMedicine.logicaldelMedicine)



module.exports = router