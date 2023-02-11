"use strict";
const db = require("../db/db");
const MInventory = db.invetories;
const MMedicine = db.medicines;
const MOffice = db.offices;
const responses = require("../middlewares/responses");

async function getAllInventories(req, res) {
  try {
    const inventories = await MInventory.findAll({});
    responses.makeResponsesOkData(res, inventories, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}

async function getInventoryList(req, res) {
  try {
    const pag = parseInt(req.query.pag) || 0;
    const size = parseInt(req.query.size) || 10;
    const ocode = req.query.oc || "";
    const mcode = req.query.mc || "";
    const inventories = await MInventory.findAndCountAll({
      limit: size,
      offset: pag,
      include: [
        { model: MOffice, where: { code: { [Op.like]: `%${ocode}%` } } },
        {
          model: MMedicine,
          where: { code: { [Op.like]: `%${mcode}%` } },
          include: [{ model: MLaboratory }],
        },
      ],
    });
    responses.makeResponsesOkData(res, inventories, "Success");
  } catch (e) {
    responses.makeResponsesException(res, e);
  }
}


// try {
//   const id = req.params.id;
//   let medicineData = req.body;
//   const medicine = await MMedicine.findOne({
//     where: { MID: id },
//   });
//   if (medicine != null) {
//     await MMedicine.update(
//       {
//         LID: medicineData.LID,
//         code: medicineData.code,
//         name: medicineData.name,
//         desc: medicineData.desc,
//         presentation: medicineData.presentation,
//         status: true,
//       },
//       {
//         where: { MID: id },
//       }
//     );
//     responses.makeResponsesOk(res, "MedicineUpdated");
//   } else {
//     responses.makeResponsesError(res, "MedicineNotfound");
//   }
// } catch (e) {
//   responses.makeResponsesException(res, e);
// }
// }

async function getPageCount(req, res) {
  try {
    const ocode = req.body.oc;
    const mcode = req.body.mc;
    const size = req.body.size;

    const totalRecords = await Inventory.findAndCountAll({
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





const inventories = await db.Inventory.findAll({
  attributes: [
    "IID",
    [db.sequelize.col("Office.code"), "code"],
    [db.sequelize.col("Office.name"), "office_name"],
    [db.sequelize.col("Medicine.code"), "medicine_code"],
    [db.sequelize.col("Laboratory.name"), "laboratory_name"],
    [db.sequelize.col("Medicine.name"), "medicine_name"],
    [db.sequelize.col("Medicine.presentation"), "medicine_presentation"],
    "quantity",
  ],
  include: [
    {
      model: MOffice,
      where: {
        code: {
          [db.Sequelize.Op.like]: "%kmx45%",
        },
      },
    },
    {
      model: MMedicine,
      where: {
        code: {
          [Op.like]: "%k%",
        },
      },
      include: [
        {
          model: MLaboratory,
        },
      ],
    },
  ],
});

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

async function getInventoryByFilter(req, res) {
  try {
    const pag = req.query.pag;
    const size = req.query.size;
    const inventories = await db.Inventory.findAll({
      limit: size,
      offset: pag,
      include: [
        {
          model: db.Office,
          as: "office",
        },
        {
          model: db.Medicine,
          as: "medicine",
          include: [
            {
              model: db.Laboratory,
              as: "laboratory",
            },
          ],
        },
      ],
    });
    responses.makeResponsesOkData(res, inventories, "Success");
  } catch (e) {
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

module.exports = {
  getAllInventories,
  getInventoryByOfficeID,
  getInventoryByMedicineID,
  updateInventory,
  createInventory,
};
