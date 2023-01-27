const router = require('express').Router()
const cInventory = require('../controllers/inventory.controller')

router.get('/', cInventory.getAllInventories)
router.get('/:id', cInventory.getInventoryByMedicineID)
router.post('/', cInventory.createInventory)


module.exports = router