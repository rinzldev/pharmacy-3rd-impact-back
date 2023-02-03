const router = require('express').Router()
const cInventory = require('../controllers/inventory.controller')

router.get('/', cInventory.getAllInventories)
router.get('/:id', cInventory.getInventoryByMedicineID)
router.get('/withjoin', cInventory.getallwithJoin)
router.post('/', cInventory.createInventory)


module.exports = router