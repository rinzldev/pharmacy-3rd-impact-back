'use strict'
const db = require('../db/db')
const MLaboratory = db.laboratory
const responses = require('../middlewares/responses')
const { Op } = require("sequelize")

//get all laboratories
async function getAllLaboratory (req, res) {
    try {
        const Laboratories = await MLaboratory.findAll({
            where: { status: true },
            order: [['LID', 'asc']]
        })
        responses.makeResponsesOkData(res, Laboratories, "Success")
    } catch (e) {
        responses.makeResponsesException(res, e)
    }
}
    
//Find laboratory by id
async function getLaboratoryByID(req, res) {
    try {
      const lid = req.params.id;
      let laboratory = null;
      if (isNaN(lid)) {
        laboratory = await MLaboratory.findOne({
          where: {
            RIF: lid,
            status: true,
          },
        });
      } else {
        laboratory = await MLaboratory.findOne({
          where: {
            [Op.or]: [{ LID: lid, status: true }, { RIF: lid }],
          },
        });
      }
      if (laboratory != null) {
        responses.makeResponsesOkData(res, laboratory, "Success");
      } else {
        responses.makeResponsesError(res, "LaboratoryNotfound");
      }
    } catch (e) {
      responses.makeResponsesException(res, e);
    }
  }
  
//version 2 
// async function getLaboratoryByID (req, res) {
//     try {
//         const lid = req.params.id
//         const laboratory = await MLaboratory.findOne({
//           where: 
//           { 
//             [Op.or]: [
//               { LID: lid },
//               { RIF: lid }
//             ],
//             status: true 
//           } 
//         }) 
//         if(laboratory != null)
//           responses.makeResponsesOkData(res,laboratory, "Success")
//         else
//           responses.makeResponsesError(res, "LaboratoryNotfound")
//       } catch (e) {
//         responses.makeResponsesException(res, e)
//       }
//     }
       


//create laboratory
async function createLaboratory (req, res) {
    try {
        const laboratoryData = req.body
        const existlaboratory = await MLaboratory.findOne({ where:{
            RIF: laboratoryData.RIF,
            status: true
        }   
        })
        if(existlaboratory){
            responses.makeResponsesError(res,"ExistLaboratory")
        }else{
            const FLaboratory = await MLaboratory.findOne({where: {
                RIF: laboratoryData.RIF,
                status: false
            }})
            if (FLaboratory){
                await MLaboratory.update({
                    RIF: laboratoryData.RIF,
                    name: laboratoryData.name,
                    address: laboratoryData.address,
                    phone: laboratoryData.phone,
                    createdAt: laboratoryData.createdAt,
                    status: true
                },
                {
                    where: {LID: FLaboratory.LID}
                })
            }
            else{
                await MLaboratory.create({
                    RIF: laboratoryData.RIF,
                    name: laboratoryData.name,
                    address: laboratoryData.address,
                    phone: laboratoryData.phone,
                    createdAt: laboratoryData.createdAt,
                    status: true
                })
            }
            responses.makeResponsesOk(res, "LaboratoryCreated")
        }
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}

// update laboratory
async function updateLaboratory (req, res) {
    try {
        const id = req.params.id
            let laboratoryData = req.body
            const laboratory = await MLaboratory.findOne({
                where: { LID: id }
            })
            if(laboratory != null){
            await MLaboratory.update({             
                RIF: laboratoryData.RIF,
                name: laboratoryData.name,
                address: laboratoryData.address,
                phone: laboratoryData.phone,
                createdAt: laboratoryData.createdAt,
                status: laboratoryData.status,
            },
            {
                where: { LID: id }
            })
            responses.makeResponsesOk(res, "LaboratoryUpdated")
            }else {
            responses.makeResponsesError(res, "LaboratoryNotfound")
        }
    } catch (e) {
        responses.makeResponsesException(res, e)
    }
}

//logical delete medicine
async function logicaldelMedicine (req, res) {
    try {
        const id = req.params.id
            let medicineData = req.body
            const medicine = await MMedicine.findOne({
                where: { MID: id }
            })
            if(medicine != null){
            await MMedicine.update({             
                code: medicineData.code,
                desc: medicineData.desc,
                presentation: medicineData.presentation,
                status: medicineData.status = false,
            },
            {
                where: { MID: id }
            })
            responses.makeResponsesOk(res, "MedicineDeleted")
            }else {
            responses.makeResponsesError(res, "MedicineNotfound")
        }
    } catch (e) {
        responses.makeResponsesException(res, e)
    }
}

//physical delete medicine
async function deleteMedicine (req, res) {
    try {
        const id = req.params.id
        const medicine = await MMedicine.findOne({
          where: { MID: id }
        })
        if(medicine != null){
          await MMedicine.destroy(
            {
            where: { MID: id }
          })
          responses.makeResponsesOk(res, "MedicineDeleted")      
        }else {
          responses.makeResponsesError(res, "MedicineNotfound")
        }
    } catch (e) {
      responses.makeResponsesException(res, e)
    }
}



module.exports = {
    getAllLaboratory,
    getLaboratoryByID,
    createLaboratory,
    updateLaboratory
}