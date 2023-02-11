"use strict";
const db = require("../db/db");
const MInventory = db.invetories;
const MMedicine = db.medicines;
const MOffice = db.offices;
const responses = require("../middlewares/responses");
const { Op } = require("sequelize");

//get all inventories
async function getAllInventories(req, res) {
  try {
    const inventories = await MInventory.findAll({
      where: { quantity: { [Op.gte]: 0 } },
      order: [["IID", "asc"]],
    });

    responses.makeResponsesOkData(res, inventories, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}

//get inventory by ID
async function getInventoryByID(req, res) {
  try {
    const iid = req.params.id;
    const inventory = await MInventory.findOne({
      where: { IID: iid, quantity: { [Op.gte]: 0 } },
    });
    if (inventory != null) {
      responses.makeResponsesOkData(res, inventory, "Success");
    } else {
      responses.makeResponsesError(res, "InventoryNotFound");
    }
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}

//create inventory
async function createInventory(req, res) {
  try {
    const inventoryData = req.body;

    // Verificar si la oficina existe
    const office = await MOffice.findOne({
      where: { SID: inventoryData.SID },
    });
    if (!office) {
      return responses.makeResponsesError(res, "OfficeNotFound");
    }

    // Verificar si el medicamento existe
    const medicine = await MMedicine.findOne({
      where: { MID: inventoryData.MID },
    });
    if (!medicine) {
      return responses.makeResponsesError(res, "MedicineNotfound");
    }

    // Verificar si el inventario existe
    const existingInventory = await MInventory.findOne({
      where: { SID: inventoryData.SID, MID: inventoryData.MID },
    });
    if (existingInventory) {
      // Actualizar la cantidad si existe
      await MInventory.update(
        {
          quantity: existingInventory.quantity + inventoryData.quantity,
        },
        {
          where: { IID: existingInventory.IID },
        }
      );
    } else {
      // Crear un nuevo registro si no existe
      await MInventory.create({
        SID: inventoryData.SID,
        MID: inventoryData.MID,
        quantity: inventoryData.quantity,
        createdAt: new Date(),
      });
    }

    // Enviar una respuesta satisfactoria
    responses.makeResponsesOk(res, "InventoryCreated");
  } catch (e) {
    // Enviar una respuesta de error
    responses.makeResponsesException(res, e);
  }
}

async function getInventoryByFilter(req, res) {
  try {
    //const inventories = await sequilize.query(`SELECT * FROM public."Inventories" as I inner join public."Offices" as O on I."SID" = O."SID"`)
    const pag = req.query.pag;
    const size = req.query.size;
    const inventories = await db.sequelize.query(`
      SELECT i."IID", o."code", o."name", m."code", 
      l."name", m."name", m."presentation", i."quantity"
      FROM public."Inventories" as i
      inner join public."Offices" as o on i."SID" = o."SID"
      inner join public."Medicines" as m on i."MID" = m."MID"
      inner join public."Laboratories" as l on m."LID" = l."LID"
      limit ${size}
      offset ${pag}
    `);

    responses.makeResponsesOkData(res, inventories, "Success");
    //responses.makeResponsesOk(res, "Success");
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

async function getInventoryList(req, res) {
  try {
    const pag = req.body.pag;
    const size = req.body.size;
    const offset = pag * size; //estano
    const ocode = req.body.oc;
    const mcode = req.body.mc;
    const inventories = await db.sequelize.query(
      `
        SELECT i."IID", o."code" as "ocode", o."name" as "oname", m."code" as "mcode", 
        l."name" as "lname", m."name" as "mname", m."presentation", i."quantity"
        FROM public."Inventories" as i
        INNER JOIN public."Offices" as o on i."SID" = o."SID"
        INNER JOIN public."Medicines" as m on i."MID" = m."MID"
        INNER JOIN public."Laboratories" as l on m."LID" = l."LID"
        WHERE (o."code" LIKE '%${ocode}%' AND m."code" LIKE '%${mcode}%')
        ORDER BY i."IID" ASC
        limit ${size}
        offset ${offset}
      `,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    responses.makeResponsesOkData(res, inventories, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}


//get pages
async function getPageCount(req, res) {
  try {
    const ocode = req.body.oc;
    const mcode = req.body.mc;
    const size = req.body.size;

    const totalRecords = await MInventory.findAndCountAll({
      include: [
        { model: MOffice, where: { code: { [Op.like]: `%${ocode}%` } } },
        { model: MMedicine, include: [{ model: Laboratory }], where: { code: { [Op.like]: `%${mcode}%` } } }
      ],
    });
    responses.makeResponsesOkData(res, totalRecords, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}


// async function getPageCount(req, res) {
//   try {
//     const ocode = req.body.oc;
//     const mcode = req.body.mc;
//     const size = req.body.size;
//     let totalRecords = await db.sequelize.query(
//       `
//         SELECT COUNT(i."IID")
//         FROM public."Inventories" as i
//         INNER JOIN public."Offices" as o on i."SID" = o."SID"
//         INNER JOIN public."Medicines" as m on i."MID" = m."MID"
//         INNER JOIN public."Laboratories" as l on m."LID" = l."LID"
//         WHERE (o."code" LIKE '%${ocode}%' AND m."code" LIKE '%${mcode}%')
//       `,
//       { type: db.sequelize.QueryTypes.SELECT }
//     );
    
//     responses.makeResponsesOkData(res, totalRecords, "Success");
//   } catch (e) {
//     responses.makeResponsesException(res, e);
//   }
// }

//update inventory
async function updateInventory(req, res) {
  try {
    const inventoryData = req.body;
    const iid = req.params.id;
    const inventory = await MInventory.findOne({
      where: {
        [Op.or]: [{ IID: iid }, { MID: iid }, { SID: iid }],
        quantity: { [Op.gte]: 0 },
      },
    });
    const office = await MOffice.findOne({
      where: { SID: inventoryData.SID },
    });
    const medicine = await MMedicine.findOne({
      where: { MID: inventoryData.MID },
    });
    if (
      inventoryData.quantity < 0 ||
      inventoryData.SID < 0 ||
      inventoryData.MID < 0
    ) {
      responses.makeResponsesError(res, "InventoryNVal");
    } else if (!office) {
      responses.makeResponsesError(res, "OfficeNotFound");
    } else if (!medicine) {
      responses.makeResponsesError(res, "MedicineNotfound");
    } else {
      if (inventory != null) {
        await MInventory.update(
          {
            SID: inventoryData.SID,
            MID: inventoryData.MID,
            createdAt: inventoryData.createdAt,
            quantity: inventoryData.quantity,
          },
          {
            where: { IID: iid },
          }
        );
        responses.makeResponsesOk(res, "InventoryUpdated");
      } else {
        responses.makeResponsesError(res, "InventoryNotFound");
      }
    }
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}

// logical Delete
async function logicDeletInv(req, res) {
  try {
    const iid = req.params.id;
    let inventoryData = req.body;
    const inventory = await MInventory.findOne({
      where: {
        [Op.or]: [{ IID: iid }, { MID: iid }, { SID: iid }],
        quantity: { [Op.gte]: 0 },
      },
    });
    const office = await MOffice.findOne({
      where: { SID: inventoryData.SID },
    });
    const medicine = await MMedicine.findOne({
      where: { MID: inventoryData.MID },
    });
    if (
      inventoryData.quantity < 0 ||
      inventoryData.SID < 0 ||
      inventoryData.MID < 0
    ) {
      responses.makeResponsesError(res, "InventoryNVal");
    } else if (!office) {
      responses.makeResponsesError(res, "OfficeNotFound");
    } else if (!medicine) {
      responses.makeResponsesError(res, "MedicineNotfound");
    } else {
      if (inventory != null) {
        await MInventory.update(
          {
            SID: inventoryData.SID,
            MID: inventoryData.MID,
            createdAt: inventoryData.createdAt,
            quantity: -1,
          },
          {
            where: { IID: iid },
          }
        );
        responses.makeResponsesOk(res, "InventoryDeleted");
      } else {
        responses.makeResponsesError(res, "InventoryNotFound");
      }
    }
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}

//physical delete Inventory
async function deleteInventory(req, res) {
  try {
    const iid = req.params.id;
    const inventory = await MInventory.findOne({
      where: { IID: iid, quantity: { [Op.gte]: 0 } },
    });
    if (inventory != null) {
      await MInventory.destroy({
        where: {
          [Op.or]: [{ IID: iid }, { MID: iid }, { SID: iid }],
          quantity: { [Op.gte]: 0 },
        },
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
  getInventoryList,
  getPageCount,
  getInventoryByID,
  updateInventory,
  deleteInventory,
  logicDeletInv,
};
