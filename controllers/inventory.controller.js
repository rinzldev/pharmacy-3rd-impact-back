"use strict"
const db = require("../db/db")
const MInventory = db.invetories
const MMedicine = db.medicines
const MOffice = db.offices
const MLaboratory = db.laboratory
const responses = require("../middlewares/responses")
const { Op } = require("sequelize")

//get all inventories
async function getAllInventories (req, res) {
  try {
      const inventories = await MInventory.findAll({
          order: [['MID', 'asc']]
      })
    responses.makeResponsesOkData(res, inventories, "Success")
  } catch (e) {
    responses.makeResponsesException(res, e)
  }
}

//get inventory by ID
async function getInventoryByID(req, res) {
  try {
    const iid = req.params.id;
    const inventory = await MInventory.findOne({
      where: { IID: iid },
    });
    if (inventory != null){
      responses.makeResponsesOkData(res, inventory, "Success");
    }
    else{
      responses.makeResponsesError(res, "InventoryNotFound");
    } 
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}

async function createInventory(req, res) {
  try {
    const inventoryData = req.body;
    const office = await MOffice.findOne({
      where: { SID: inventoryData.SID },
    });
    if (office == null) responses.makeResponsesError(res, "AJA");
    const medicine = await MMedicine.findOne({
      where: { MID: inventoryData.MID },
    });
    if (medicine == null) responses.makeResponsesError(res, "AJA");

    await MInventory.create({
      SID: inventoryData.SID,
      MID: inventoryData.MID,
      quantity: inventoryData.quantity,
      createtAt: laboratoryData.createdAt,
    });
    responses.makeResponsesOk(res, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}

async function getInventoryByFilter(req, res) {
  try {
    //const inventories = await sequilize.query(`SELECT * FROM public."Inventories" as I inner join public."Offices" as O on I."SID" = O."SID"`)
    const pag = req.query.pag
    const size = req.query.size
    const inventories = await db.sequelize.query(`
      SELECT i."IID", o."code", o."name", m."code", 
      l."name", m."name", m."presentation", i."quantity"
      FROM public."Inventories" as i
      inner join public."Offices" as o on i."SID" = o."SID"
      inner join public."Medicines" as m on i."MID" = m."MID"
      inner join public."Laboratories" as l on m."LID" = l."LID"
      limit ${size}
      offset ${pag}
    `)

    responses.makeResponsesOkData(res, inventories, "Success");
    //responses.makeResponsesOk(res, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}


// async function getAllInventories(req, res) {
//   try {
//     const inventories = await db.sequelize.query(`
//     SELECT *
// 	    FROM public."Inventories"
//   `)
//     responses.makeResponsesOkData(res, inventories, "Success");
//   } catch (e) {
//     responses.makeResponsesException(res, e);
//   }
// }


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
    const inventoryData = req.body;

    const current = inventoryData.currentValue;
    current = current - inventoryData.quantity;
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
async function logicDeletInv(req, res) {
  try {
    const inventoryData = req.body;
    const sid = req.params.SID;
    const mid = req.params.MID;
    const inventory = await MInventory.findAll({
      where: { SID: sid, MID: mid },
    });
    if (inventory != null && inventoryData.quantity >= 0) {
      await MInventory.update(
        {
          quantity: 0,
        },
        {
          where: { UID: id, status: true },
        }
      );
      responses.makeResponsesOk(res, "UDeleted");
    } else if (inventoryData.quantity < 0) {
      responses.makeResponsesError(res, "InventoryNVal");
    } else {
      responses.makeResponsesError(res, "InventoryNotFound");
    }
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}

//physical delete Inventory
async function deleteInventory(req, res) {
  try {
    const sid = req.params.SID;
    const mid = req.params.MID;
    const inventory = await MInventory.findAll({
      where: { SID: sid, MID: mid },
    });
    if (inventory != null) {
      await MInventory.destroy({
        where: { SID: sid, MID: mid },
      });
      responses.makeResponsesOk(res, "InventoryDeleted");
    } else {
      responses.makeResponsesError(res, "InventoryNotFound");
    }
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}


module.exports = {
  createInventory,
  getAllInventories,
  getInventoryByFilter,
  getInventoryByID,
  updateInventory,  
  deleteInventory,
  logicDeletInv,  
};
