'use strict'
const db = require('../db/db')
const MOffice = db.offices
const responses = require('../middlewares/responses')

async function getAllOffices (req, res) {
    try {
        const offices = await MOffice.findAll({
            where: { status: true },
            order: [['SID', 'asc']]
        })
        responses.makeResponsesOkData(res, offices, "Success")
    } catch (e) {
        responses.makeResponsesException(res, e)
    }
}


async function getOfficeByID (req, res) {
    try {
        const sid = req.params.id
        const office = await MOffice.findOne({
        where: { SID: sid, status: true } 
      })
      
    responses.makeResponsesOkData(res, office, "Success")
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}

async function createOffice (req, res) {
    try {
        let officeData = req.body
        await MOffice.create({  
            code: officeData.code,
            status: officeData.status
        })
        responses.makeResponsesOk(res, "Success")
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}


async function updateOffice (req, res) {
    try {
        const id = req.params.id
          let officeData = req.body
          const office = await MOffice.findOne({
            where: { SID: id}
          })
          if(office != null){
            await MOffice.update({             
              code: officeData.code,
              status: officeData.status,
            },
            {
              where: {SID: id}
            })
            responses.makeResponsesOk(res, "UUpdated")
        }else {
            responses.makeResponsesError(res, "UNotFound")
        }
    } catch (e) {
        responses.makeResponsesException(res, e)
    }
}
    
async function deleteOffice (req, res) {
    try {
        const id = req.params.id
        const office = await MOffice.findOne({
            where: { SID: id }
        })
        if(office != null){
            await MOffice.destroy(
            {
            where: {SID: id }
            })
            responses.makeResponsesOk(res, "UDeleted")
            
        }else {
            responses.makeResponsesError(res, "UNotFound")
        }
        } catch (e) {
        responses.makeResponsesException(res, e)
    }
}
      

module.exports = {
    getAllOffices,
    getOfficeByID,
    createOffice,
    updateOffice,
    deleteOffice
}