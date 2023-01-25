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

async function getUserByID(req, res) {

    try {
      const uid = req.params.id
      const user = await MUser.findOne({
        where: { UID: uid } 
      })
      responses.makeResponseOkData(res, users, "Success")
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


async function updateUser (req, res) {
  try {
      const id = req.params.id
      const userData = req.body
      const user = await MUser.findOne({
        where: { UID: id }
      })
      if(user == null){
        responses.makeResponsesError(res, "UNotFound")

      }else {
        user = await MUser.update({
          identification: userData.identification,
          name: userData.name,
          lastName: userData.lastName,
          mail: userData.mail,
          phone:  userData.phone,
          type: userData.type,
          password: userData.password,
          status: userData.status,
        },
        {
          where: {UID: id }
        })
      }
    responses.makeResponsesOkData(res, userData, "Success")
  } catch (e) {
    responses.makeResponsesException(res, e)
  }
}


async function deleteUser (req, res) {
  try {
      const id = req.params.id
      const userData = req.body
      const user = await MUser.findOne({
        where: { UID: id }
      })
      if(user == null){
        responses.makeResponsesError(res, "UNotFound")
      }else {
        user = await MUser.destroy(
          {
          where: {UID: id }
        })
      }
    responses.makeResponsesOkData(res, userData, "Success")
  } catch (e) {
    responses.makeResponsesException(res, e)
  }
}


module.exports = {
    getAllUsers,
    getUserByID,
    updateUser,
    createUser,
    deleteUser
}