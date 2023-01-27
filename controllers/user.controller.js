'use strict'
const db = require('../db/db')
const MUser = db.users
const responses = require('../middlewares/responses')
const validate = require('../middlewares/validate')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

      if(user != null)
        responses.makeResponsesOk(res, user, "Success")
      else
        responses.makeResponsesError(res, "UNotFound")
    } catch (e) {
      responses.makeResponsesException(res, e)
    }
}

// Create User
async function createUser (req, res) {
try {
  const userData = req.body
  const existuser = await MUser.findOne({ where: {
    identification: userData.identification,
    status: true}   
  })
  if(existuser){
    responses.makeResponsesError(res, "UFound")
  }
  else{
      let FUser = await MUser.findOne({ where: {
        identification: userData.identification,
        status: false
      }})
      if (FUser) {
          await MUser.update({
          identification: userData.identification,
          name: userData.name,
          lastName: userData.lastName,
          mail: userData.mail,
          phone:  userData.phone,
          type: userData.type,
          password: bcrypt.hashSync(userData.password),
          status: true,
        },
        {
          where: { UID: FUser.UID }
        })
      } else {
        await MUser.create({  
          SID: userData.SID,
          identification: userData.identification,
          name: userData.name,
          lastName: userData.lastName,
          mail: userData.mail,
          phone:  userData.phone,
          type: userData.type,
          password: bcrypt.hashSync(userData.password),
          status: userData.status,
        })
      }      
    responses.makeResponsesOk(res,"Success")
  }
  } catch (e) {
    responses.makeResponsesException(res, e)
  }
}

//login
async function login (req, res) {
  try{
    const userval = await MUser.findOne({ 
      where:{mail: req.body.mail}
      
    })
    if(!userval) {
      responses.makeResponsesError(res, 'Incorrect credentials', 'ULoginError1')
    }
    const passwval = await validate.comparePassword(req.body.password, userval.password)

    if(!passwval) {
      responses.makeResponsesError(res, 'Incorrect credentials', 'ULoginError2')
    }

    const secret = process.env.SECRET_KEY
    const token = jwt.sign({id: userval._id,}, secret, {expiresIn: '1w'})
    const user = {
      id: userval._id,
      type: userval.type,
      token: token
    }
    responses.makeResponsesOkData(res, user, 'Success')

  }catch(e){
    responses.makeResponsesError(res, e, 'UnexpectedError')
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
          password: bcrypt.hashSync(userData.password),
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
          password: bcrypt.hashSync(userData.password),
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
    createUser,
    login,
    updateUser,
    deleteUser,
    logicaldeluser
}