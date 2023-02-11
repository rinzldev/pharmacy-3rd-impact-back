const router = require('express').Router()
const cInventory = require('../controllers/inventory.controller')

//gets
router.get('/', cInventory.getAllInventories)
router.get('/filter', cInventory.getInventoryByFilter)
router.get('/count/:id', cInventory.getCountMedicine)
router.get('/sum/:id', cInventory.getSumMedicine)
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