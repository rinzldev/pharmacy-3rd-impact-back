'use strict'
const MUser = require('../models/user.model')
const responses = require('../middlewares/responses')

async function getAllUsers (req, res) {
  try {
    const users = await MUser.findAll({
        order: [['UID', 'asc']]
    })
    responses.makeResponseOkData(res, users, "Success")
  } catch (e) {
    responses.makeResponsesException(res, e)
  }
}

async function getUserByID (req, res) {
    try {
      responses.makeResponseOkData(res, users, "Success")
    } catch (e) {
      responses.makeResponsesException(res, e)
    }
}

async function updateUser (req, res) {
    try {
        responses.makeResponseOk(res, "Success")
    } catch (e) {
        responses.makeResponsesException(res, e)
    }
}

async function createUser (req, res) {
    try {
        const userData = req.body
        const user = await MUser.create({  
          identification: userData.identification,
          name: userData.name,
          lastName: userData.lastName,
          mail: userData.mail,
          phone:  userData.phone,
          type: userData.type,
          password: userData.password,
          status: userData.status,
        })
        responses.makeResponsesOk(res, "Success")
    } catch (e) {
    responses.makeResponsesException(res, e)
    }
}

module.exports = {
    getAllUsers,
    getUserByID,
    updateUser,
    createUser
}