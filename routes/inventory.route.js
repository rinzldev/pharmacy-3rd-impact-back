const router = require('express').Router()
const cInventory = require('../controllers/inventory.controller')

//gets
router.get('/', cInventory.getAllInventories)
router.get('/filter', cInventory.getInventoryByFilter)
router.get('/:id', cInventory.getInventoryByID)
router.get('/:SID/:MID', cInventory.getByMID)
//post
router.post('/inventoryList', cInventory.getInventoryList)
router.post('/inventoryPages', cInventory.getPageCount)
router.post('/', cInventory.createInventory)

//puts
router.put('/:id', cInventory.updateInventory)
//delete
router.delete('/:SID/:MID', cInventory.logicDeletInv)
router.delete('/DeleteForever/:id', cInventory.deleteInventory)



module.exports = router