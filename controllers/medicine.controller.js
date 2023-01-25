'use strict'
const MMedicine = require('../models/medicine.model')
const responses = require('../middlewares/responses')

async function getAllMedicines (req, res) {
    try {
        const medicines = await MMedicine.findAll({
            order: [['MID', 'asc']]
        })
      responses.makeResponseOkData(res, medicines, "Success")
    } catch (e) {
      responses.makeResponsesException(res, e)
    }
}

async function getMedicineByID (req, res) {
    try {
    responses.makeResponseOkData(res, medicines, "Success")
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}

async function updateOffice (req, res) {
    try {
    responses.makeResponseOk(res, "Success")
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}

async function createMedicine (req, res) {
    try {
    responses.makeResponseOk(res, "Success")
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}

module.exports = {
    getAllMedicines,
    getMedicineByID,
    updateMedicine,
    createMedicine
}