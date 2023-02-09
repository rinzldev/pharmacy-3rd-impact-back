const router = require('express').Router()
const cInventory = require('../controllers/inventory.controller')


router.get('/', cInventory.getAllInventories)
router.get('/filter', cInventory.getInventoryByFilter)
router.get('/:id', cInventory.getInventoryByID)
router.post('/', cInventory.createInventory)



module.exports = router