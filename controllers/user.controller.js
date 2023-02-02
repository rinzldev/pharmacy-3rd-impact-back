'use strict'
const db = require('../db/db')
const MUser = db.users
const responses = require('../middlewares/responses')
const validate = require('../middlewares/validate')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize")

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
        where: 
        { 
          [Op.or]: [
            { UID: uid },
            { identification: uid }
          ],
          status: true 
        } 
      }) 
      if(user != null)
        responses.makeResponsesOkData(res,user, "Success")
      else
        responses.makeResponsesError(res, "UNotFound")
    } catch (e) {
      responses.makeResponsesException(res, e)
    }
}

//testing
async function getUserByIdentification(req, res) {
  try {
    const uident = req.params.identification
    const user = await MUser.findOne({
      where: { identification: uident, status: true } 
    })

    if(user != null)
      responses.makeResponsesOk(res, user, "Success")
    else
      responses.makeResponsesError(res, "UNotFound")
  } catch (e) {
    responses.makeResponsesException(res, e)
  }
}



// create user
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
      const FUser = await MUser.findOne({ where: {
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
      responses.makeResponsesError(res, 'ULoginError1')
    }else if(userval === null){
      responses.makeResponsesError(res, "Usernull")
    }

    const passwval = await validate.comparePassword(req.body.password, userval.password)
    if(!passwval) {
      responses.makeResponsesError(res, 'ULoginError2')
    }else if(passwval === null){
      responses.makeResponsesError(res, "Passwnnull")
    }

    const secret = process.env.SECRET_KEY
    const token = jwt.sign({id: userval._id,}, secret, {expiresIn: '1w'})
    const user = {
      id: userval._id,
      type: userval.type,
      token: token
    }
    responses.makeResponsesOk(res, 'ULogin')

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
      
      if(user != null && userData.password != null){
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


//logical delete user
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


//physical delete user
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
    logicaldeluser,
}