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
    
//Find medicine by id
async function getLaboratoryByID (req, res) {
    try {
        const lid = req.params.id
        const laboratory = await MLaboratory.findOne({
          where: 
          { 
            [Op.or]: [
              { LID: lid },
              { RIF: lid }
            ],
            status: true 
          } 
        }) 
        if(laboratory != null)
          responses.makeResponsesOkData(res,laboratory, "Success")
        else
          responses.makeResponsesError(res, "LaboratoryNotfound")
      } catch (e) {
        responses.makeResponsesException(res, e)
      }
    }
       


//create medicine
async function createMedicine (req, res) {
    try {
        const medicineData = req.body
        const existmedicine = await MMedicine.findOne({ where:{
            code: medicineData.code,
            status: true
        }   
        })
        if(existmedicine){
            responses.makeResponsesError(res,"ExistMedicine")
        }else{
            const FMedicine = await MMedicine.findOne({where: {
                code: medicineData.code,
                status: false
            }})
            if (FMedicine){
                await MMedicine.update({
                    code: medicineData.code,
                    desc: medicineData.desc,
                    presentation: medicineData.presentation,
                    status: true
                },
                {
                    where: {MID: FMedicine.MID}
                })
            }
            else{
                await MMedicine.create({
                    code: medicineData.code,
                    desc: medicineData.desc,
                    presentation: medicineData.presentation,
                    status: true
                })
            }
            responses.makeResponsesOk(res, "MedicineCreated")
        }
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}

// update medicine
async function updateMedicine (req, res) {
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
                status: false,
            },
            {
                where: { MID: id }
            })
            responses.makeResponsesOk(res, "MedicineUpdated")
            }else {
            responses.makeResponsesError(res, "MedicineNotfound")
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
    getLaboratoryByID

}