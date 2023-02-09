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

//logical delete laboratory
async function logicaldelLaboratoy(req, res) {
    try {
        const lid = req.params.id
            let laboratoryData = req.body
            const laboratory = await MLaboratory.findOne({
                where: { LID: lid }
            })
            if(laboratory != null){
            await MLaboratory.update({             
                RIF: laboratoryData.RIF,
                name: laboratoryData.name,
                address: laboratoryData.address,
                phone: laboratoryData.phone,
                createdAt: laboratoryData.createdAt,
                status: false,
            },
            {
                where: { LID: lid }
            })
            responses.makeResponsesOk(res, "LaboratoryDeleted")
            }else {
            responses.makeResponsesError(res, "LaboratoryNotfound")
        }
    } catch (e) {
        responses.makeResponsesException(res, e)
    }
}

//physical delete medicine
async function deleteLaboratory (req, res) {
    try {
        const lid = req.params.id
        const laboratory = await MLaboratory.findOne({
          where: { LID: lid }
        })
        if(laboratory != null){
          await MLaboratory.destroy(
            {
            where: { LID: id }
          })
          responses.makeResponsesOk(res, "LaboratoryDeleted")      
        }else {
          responses.makeResponsesError(res, "LaboratoryNotfound")
        }
    } catch (e) {
      responses.makeResponsesException(res, e)
    }
}



module.exports = {
    getAllLaboratory,
    getLaboratoryByID,
    createLaboratory,
    updateLaboratory,
    logicaldelLaboratoy,
    deleteLaboratory
}