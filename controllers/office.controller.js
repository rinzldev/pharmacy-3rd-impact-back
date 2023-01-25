'use strict'
const MOffice = require('../models/office.model')
const responses = require('../middlewares/responses')

async function getAllOffices (req, res) {
    try {
        const offices = await MOffice.findAll({
            order: [['SID', 'asc']]
        })
        responses.makeResponseOkData(res, offices, "Success")
    } catch (e) {
        responses.makeResponsesException(res, e)
    }
}

async function getOfficeByID (req, res) {
    try {
    responses.makeResponseOkData(res, offices, "Success")
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

async function createOffice (req, res) {
    try {
    responses.makeResponseOk(res, "Success")
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}

module.exports = {
    getAllOffices,
    getOfficeByID,
    updateOffice,
    createOffice
}