'use strict'
const MInventory = require('../models/inventory.model')
const responses = require('../middlewares/responses')

async function getAllInventories (req, res) {
        try {
            const inventories = await MInventory.findAll({
                
            })
            responses.makeResponsesOkData(res, inventories, "Success")
        } catch (e) {
            responses.makeResponsesException(res, e)
        }
    }
    

  async function getInventoryByOfficeID (req, res) {
      try {
      responses.makeResponsesOkData(res, inventories, "Success")
      } catch (e) {
      responses.makeResponsesException(res, e)
      }
  }

  async function getInventoryByMedicineID (req, res) {
    try {
    responses.makeResponsesOkData(res, inventories, "Success")
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}
  
async function updateInventory (req, res) {
    try {
    responses.makeResponsesOk(res, "Success")
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}


async function createInventory (req, res) {
    try {
        
        const inventoryData = req.body
        await MInventory.create({  
            
            SID: inventoryData.SID,
            MID: inventoryData.MID,
            quantity: inventoryData.quantity

          })
          responses.makeResponsesOk(res,"Success")    
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}



module.exports = {
    getAllInventories,
    getInventoryByOfficeID,
    getInventoryByMedicineID,
    updateInventory,
    createInventory
}