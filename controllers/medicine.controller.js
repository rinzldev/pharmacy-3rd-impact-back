'use strict'
const db = require('../db/db')
const MMedicine = db.medicines
const responses = require('../middlewares/responses')

//get all medicine
async function getAllMedicines (req, res) {
    try {
        const medicines = await MMedicine.findAll({
            where: { status: true },
            order: [['MID', 'asc']]
        })
      responses.makeResponsesOkData(res, medicines, "Success")
    } catch (e) {
      responses.makeResponsesException(res, e)
    }
}

//Find medicine by id
async function getMedicineByID (req, res) {
    try {
        const mid = req.params.id
        const medicine = await MMedicine.findOne({
        where: { MID: mid, status: true } 
      })
      
    responses.makeResponsesOkData(res, medicine, "Success")
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}

//testing 
async function getMedicineByCode(req, res) {
    try {
      const medicinecode = req.params.id
      const medicine = await MMedicine.findOne({
        where: { code: medicinecode, status: true } 
      })
  
      if(user != null)
        responses.makeResponsesOk(res, user, "Success")
      else
        responses.makeResponsesError(res, "MedicineNotfound")
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
            status: medicineData.status
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
                    status: medicineData.status
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
                status: medicineData.status,
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
    getAllMedicines,
    getMedicineByID,
    createMedicine,
    updateMedicine,
    logicaldelMedicine,
    deleteMedicine,
    getMedicineByCode
}