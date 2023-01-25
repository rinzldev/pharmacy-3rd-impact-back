'use strict'
const db = require('../db/db')
const MUser = db.users
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
      //Ejecute aqui el Servicio//
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
        let userData = req.body
        const usr = await MUser.create({  
          SID: userData.SID,
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