"use strict";
const MInventory = require("../models/inventory.model");
const responses = require("../middlewares/responses");


async function createInventory(req, res) {
  try {
    const inventoryData = req.body;
    await MInventory.create({
      SID: inventoryData.SID,
      MID: inventoryData.MID,
      quantity: inventoryData.quantity,
      createtAt: Date.now(),
    });
    responses.makeResponsesOk(res, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}





async function getAllInventories(req, res) {
  try {
    const inventories = await MInventory.findAll({
        order: [['MID', 'asc']]
    });
    responses.makeResponsesOkData(res, inventories, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}



async function getInventoryByOfficeID(req, res) {
  try {
    responses.makeResponsesOkData(res, inventories, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}




async function getInventoryByMedicineID(req, res) {
  try {
    //Aqui va un get suma / sum de suma
    responses.makeResponsesOkData(res, inventories, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}

async function updateInventory(req, res) {
  try {
    const inventoryData = req.body
    
    const current = inventoryData.currentValue
    current = current - inventoryData.quantity
    await MInventory.create({
        SID: inventoryData.SID,
        MID: inventoryData.MID,
        quantity: current,
        createtAt: Date.now(),
        });

    // validacion de cantidad
    responses.makeResponsesOk(res, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}


// logical Delete
async function logicaldelInventory(req, res){
    try {

            const inventoryData = req.body
            const sid = req.params.SID
            const mid = req.params.MID
            const inventory = await MInventory.findAll({
          where: { SID: sid, MID: mid }
        })
          if(inventory != null && inventoryData.quantity >= 0){
            await MInventory.update({
                quantity: 0
            },
            {
              where: {UID: id, status: true }
            })
            responses.makeResponsesOk(res, "UDeleted")
          } else if (inventoryData.quantity < 0){
            responses.makeResponsesError(res, "InventoryNVal")
          }
          else {
            responses.makeResponsesError(res, "InventoryNotFound")
          }
      } catch (e) {
        responses.makeResponsesException(res, e)
    }    
} 

// 

//physical delete Inventory
async function deleteInventory (req, res) {
    try {
        const sid = req.params.SID
        const mid = req.params.MID
        const inventory = await MInventory.findAll({
          where: { SID: sid, MID: mid }
        })
        if(inventory != null){
          await MInventory.destroy(
            {
            where: { SID: sid, MID: mid }
          })
          responses.makeResponsesOk(res, "InventoryDeleted")
          
        }else {
          responses.makeResponsesError(res, "InventoryNotFound")
        }
      } catch (e) {
      responses.makeResponsesException(res, e)
    }
  }

  async function getallwithJoin(req, res) {
    try{
      const inventories = await MInventory.findAll({
        include: {
          model: MOffice,
          as: 'o',
          model: MMedicine,
          as:"m"   
        }
      });
      return inventories
      
    }catch (e) {
      responses.makeResponsesException(res, e);
    }
  }

module.exports = {
  getAllInventories,
  getInventoryByOfficeID,
  getInventoryByMedicineID,
  updateInventory,
  createInventory,
  deleteInventory,
  logicaldelInventory,
  getallwithJoin
};
