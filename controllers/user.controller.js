'use strict'
const db = require('../db/db')
const MUser = db.users
const responses = require('../middlewares/responses')

// get all users
async function getAllUsers (req, res) {
  try {
    const users = await MUser.findAll({
        where: { status: true },
        order: [['UID', 'asc']]
    })
    responses.makeResponsesOkData(res, users, "Success")
  } catch (e) {
    responses.makeResponsesException(res, e)
  }
}

// Find user by Id
async function getUserByID(req, res) {

    try {
      const uid = req.params.id
      const user = await MUser.findOne({
        where: { UID: uid, status: true } 
      })
      responses.makeResponsesOk(res, user, "Success")
    } catch (e) {
      responses.makeResponsesException(res, e)
    }
}

// Create User
async function createUser (req, res) {
    try {
        let userData = req.body
        await MUser.create({  
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

//Update User
async function updateUser (req, res){
  try {
    const id = req.params.id
      let userData = req.body
      const user = await MUser.findOne({
        where: { UID: id }
      })
      if(user != null){
        await MUser.update({
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
          where: { UID: id }
        })
        responses.makeResponsesOk(res, "UUpdated")
      }else {
        responses.makeResponsesError(res, "UNotFound")
      }
  } catch (e) {
    responses.makeResponsesException(res, e)
  }
}


//Logical Delete User
async function logicaldeluser(req, res){
  try {
    const id = req.params.id
      let userData = req.body
      const user = await MUser.findOne({
        where: { UID: id, status: true }
      })
      if(user != null && user.status === true){
        await MUser.update({
          identification: userData.identification,
          name: userData.name,
          lastName: userData.lastName,
          mail: userData.mail,
          phone:  userData.phone,
          type: userData.type,
          password: userData.password,
          status: userData.status = false,
        },
        {
          where: {UID: id, status: true }
        })
        responses.makeResponsesOk(res, "UDeleted")
      }else {
        responses.makeResponsesError(res, "UNotFound")
      }
  } catch (e) {
    responses.makeResponsesException(res, e)
  }
}


//Physical Delete User
async function deleteUser (req, res) {
  try {
      const id = req.params.id
      const user = await MUser.findOne({
        where: { UID: id }
      })
      if(user != null){
        await MUser.destroy(
          {
          where: {UID: id }
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
    getAllUsers,
    getUserByID,
    updateUser,
    createUser,
    deleteUser,
    logicaldeluser
}